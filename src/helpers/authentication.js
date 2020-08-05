const camelCaseKeys = require('camelcase-keys');
const _ = require('lodash');
const fetch = require('./fetch');
const serializeFormData = require('./serializeFormData');
const stringifyJSONParams = require('./stringifyJSONParams');
const config = require('../config');
const store = require('../store')('tokens');
const { APIError } = require('../errors');

const isTest = process.env.NODE_ENV === 'test';
const authentications = {};
const timeouts = {};
const unscopedTokens = {};

if (!isTest) Object.assign(unscopedTokens, store.load());

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

module.exports = (application) => {
  if (authentications[application]) return authentications[application];

  // eslint-disable-next-line no-multi-assign
  const tokens = (unscopedTokens[application] =
    unscopedTokens[application] || {});

  const authenticateAsUser = (user) => authenticateWith(get(user));

  const fetchToken = async (body) => {
    const { authentication } = config[application];
    const { options, serializer, ...rest } = authentication.token;
    const response = await fetch({
      ...rest,
      method: 'post',
      body: serializerFor(serializer)({
        ...options,
        ...body,
      }),
      headers: headersFor(serializer),
    });

    if (!response.ok) {
      throw new APIError(
        application,
        `Failed fetching token: ${response.statusText}`
      );
    }

    return camelCaseKeys(response.body, { deep: true });
  };

  const refreshToken = (user) => {
    if (user === 'default') return;
    if (isTest) return;

    clearTimeout(timeouts[user]);

    timeouts[user] = setTimeout(async () => {
      config.logger.debug(`[API][${application} Starting Refreshing Token`);

      const response = await fetchToken({
        grantType: 'refresh_token',
        refreshToken: tokens[user].refreshToken,
      });

      update(user, response);

      config.logger.debug(`[API][${application} Completed Refreshing Token`);

      refreshToken(user);
    }, (tokens[user].expiresIn - 300) * 1000);
  };

  function get(user = 'default') {
    return _.get(tokens, [user, 'accessToken']);
  }

  function update(user, newTokens) {
    tokens[user] = tokens[user] || {};

    Object.assign(tokens[user], newTokens);
    store.save(unscopedTokens);

    refreshToken(user);
  }

  _.forEach(_.keys(tokens), refreshToken);

  authentications[application] = {
    authenticateWith,
    authenticateAsUser,
    fetchToken,
    get,
    update,
  };

  return authentications[application];
};
