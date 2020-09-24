const camelCaseKeys = require('camelcase-keys');
const _ = require('lodash');
const fetch = require('./fetch');
const serializeFormData = require('./serializeFormData');
const stringifyJSONParams = require('./stringifyJSONParams');
const config = require('../config');
const { APIError } = require('../errors');

const authentications = {};
const unscopedTokens = {};

const authenticateWith = (token) => ({
  requestInterceptor: (request) => {
    request.headers.Authorization = `Bearer ${token}`;

    return request;
  },
});

const headersFor = (serializer) => {
  switch (serializer) {
    case 'multipart/form-data':
      return {};
    default:
      return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
  }
};

const serializerFor = (serializer) => {
  switch (serializer) {
    case 'multipart/form-data':
      return serializeFormData;
    default:
      return stringifyJSONParams;
  }
};

const toMilliseconds = (timestamp) => {
  if (_.isString(timestamp)) return Number(new Date(timestamp)); // ISO8601 string

  if (timestamp < 1577836800000) return Number(new Date(timestamp * 1000)); // timestamp as seconds

  return Number(new Date(timestamp)); // timestamp as milliseconds
};

const isExpired = (token) => {
  const createdAt = toMilliseconds(token.createdAt);
  const expiresIn = toMilliseconds(token.expiresIn);
  const expiresAt = createdAt + expiresIn - 600_000; // refresh 10 minutes before expected expiry

  return expiresAt < toMilliseconds(new Date());
};

module.exports = (application) => {
  if (authentications[application]) return authentications[application];

  // eslint-disable-next-line no-multi-assign
  const tokens = (unscopedTokens[application] =
    unscopedTokens[application] || {});

  const fetchToken = async (body, options) => {
    const { authentication } = config[application];
    const { options: tokenOptions, serializer, ...rest } = authentication.token;
    const response = await fetch({
      ...rest,
      method: 'post',
      body: serializerFor(serializer)({
        ...tokenOptions,
        ...body,
      }),
      headers: headersFor(serializer),
      ...options,
    });

    if (!response.ok) {
      throw new APIError(
        application,
        `Failed fetching token: ${response.statusText}`
      );
    }

    const token = camelCaseKeys(response.body, { deep: true });

    return { createdAt: new Date().getTime(), ...token };
  };

  const refreshToken = async (user) => {
    config.logger.debug(`[API][${application}] Starting Refreshing Token`);

    tokens[user] = fetchToken(
      user === 'default'
        ? {}
        : {
            grantType: 'refresh_token',
            refreshToken: (await tokens[user]).refreshToken,
          }
    ).then((token) => {
      config.logger.debug(`[API][${application}] Completed Refreshing Token`);

      return Object.assign(token, {
        createdAt: new Date().getTime(),
      });
    });

    return tokens[user];
  };

  const get = async (user = 'default') => {
    let token = await tokens[user];

    if (token && isExpired(token)) token = await refreshToken(user);

    return token && token.accessToken;
  };

  const store = (user, newTokens) => {
    tokens[user] = Promise.resolve(newTokens);
  };

  const authenticateAsUser = async (user) => authenticateWith(await get(user));

  authentications[application] = {
    authenticateWith,
    authenticateAsUser,
    fetchToken,
    get,
    store,
  };

  return authentications[application];
};
