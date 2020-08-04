const camelCaseKeys = require('camelcase-keys');
const _ = require('lodash');
const config = require('../../config');
const { fetch, stringifyJSONParams } = require('../../helpers');
const store = require('../../store')('tokens');
const { APIError } = require('../../errors');

const timeouts = {};
const tokens = {};

const fetchToken = async (body) => {
  const response = await fetch({
    url: `${config.laboperator.url.origin}/oauth/token`,
    method: 'post',
    body: stringifyJSONParams({
      ...config.laboperator.authentication,
      ...body,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new APIError(`Failed fetching token: ${response.statusText}`);
  }

  return camelCaseKeys(response.body, { deep: true });
};

const refreshToken = (user) => {
  if (user === 'default') return;
  if (process.env.NODE_ENV === 'test') return;

  clearTimeout(timeouts[user]);

  timeouts[user] = setTimeout(async () => {
    config.logger.debug('[API] Starting Refreshing Token');

    const response = await fetchToken({
      grantType: 'refresh_token',
      refreshToken: tokens[user].laboperator.refreshToken,
    });

    update(user, { laboperator: response });

    config.logger.debug('[API] Completed Refreshing Token');

    refreshToken(user);
  }, (tokens[user].laboperator.expiresIn - 300) * 1000);
};

function get(user, application) {
  return _.get(tokens, [user, application, 'accessToken']);
}

function update(user, newTokens) {
  tokens[user] = tokens[user] || {};

  Object.assign(tokens[user], newTokens);
  store.save(tokens);

  refreshToken(user);
}

if (process.env.NODE_ENV !== 'test') {
  Object.assign(tokens, store.load());

  _.forEach(_.keys(tokens), refreshToken);
}

module.exports = {
  fetchToken,
  get,
  update,
};
