const camelCaseKeys = require('camelcase-keys');
const _ = require('lodash');
const fetch = require('./fetch');
const serializeFormData = require('./serializeFormData');
const stringifyJSONParams = require('./stringifyJSONParams');
const config = require('../config');
const { APIError, UnauthorizedError } = require('../errors');

const authentications = {};
const isTest = process.env.NODE_ENV === 'test';

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

const wrapInPromises = (object) =>
  _.mapValues(object, (value) => Promise.resolve(value));

const unwrapPromises = async (object) => {
  const unwrapped = {};

  await Promise.all(
    _.map(object, async (value, key) => {
      unwrapped[key] = await value;
    })
  );

  return unwrapped;
};

const fixturesFor = (application) => {
  switch (application) {
    case 'laboperator':
      return {
        1: {
          createdAt: Number(new Date()),
          accessToken: 'laboperator-access-token',
          tokenType: 'Bearer',
          expiresIn: 3600,
          refreshToken: 'laboperator-refresh-token',
          scope: 'read',
        },
      };
    default:
      return {};
  }
};

module.exports = (application, { persisted = false } = {}) => {
  if (authentications[application]) return authentications[application];

  const loadTokens = () => {
    if (persisted) {
      const storage = require('../storage')(`tokens-${application}`);
      const tokens = wrapInPromises(
        isTest ? fixturesFor(application) : storage.load()
      );

      tokens.save = () => unwrapPromises(tokens).then(storage.save);

      return tokens;
    } else {
      const tokens = {};

      tokens.save = _.noop;

      return tokens;
    }
  };
  const tokens = loadTokens();

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

      return token;
    });

    return tokens[user];
  };

  const get = async (user = 'default') => {
    let token = await tokens[user];

    if (token && isExpired(token)) token = await refreshToken(user);

    return token && token.accessToken;
  };

  const authenticateWith = (token) => {
    if (!token) {
      throw new UnauthorizedError(application, 'Missing valid accessToken');
    }

    return {
      requestInterceptor: (request) => {
        request.headers.Authorization = `Bearer ${token}`;

        return request;
      },
    };
  };

  authentications[application] = {
    authenticateWith,
    authenticateAsUser: async (user) => authenticateWith(await get(user)),
    fetchToken,
    get,
    store: (user, newToken) => {
      tokens[user] = Promise.resolve(newToken);
      tokens.save();
    },
  };

  return authentications[application];
};
