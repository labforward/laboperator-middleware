const fetchMock = require('fetch-mock');
const _ = require('lodash');
const config = require('../config');

const mocks = {};

const addFixtures = (provider, fixtures) => {
  mocks[provider] = [...(mocks[provider] || []), ...fixtures];
};

const headers = { 'Content-Type': 'application/json' };
const normalize = (object, key) => {
  const raw = (object || {})[key] || {};

  if (raw.status) {
    return raw.body ? { ...raw, headers } : raw;
  }

  return { headers, body: raw };
};

const getProvider = (url) =>
  _.findKey(mocks, (provider, key) => url.startsWith(key));

const getMock = (url, { body }) => {
  const provider = getProvider(url);
  const endpoint = url.replace(provider, '');

  return (mocks[provider] || []).find(
    (mock) =>
      mock.endpoint === endpoint &&
      _.isMatch(
        _.isString(body) ? JSON.parse(body) : body,
        normalize(mock, 'request').body
      )
  );
};
const matcher = (url, options) => !!getMock(url, options);
const getResponse = (url, options) =>
  normalize(getMock(url, options), 'response');

beforeEach(() => fetchMock.mock(matcher, getResponse));
afterEach(() => fetchMock.restore());

addFixtures(config.laboperator.url.href, require('./fixtures'));
addFixtures(config.laboperator.url.origin, require('./fixtures'));

module.exports = {
  addFixtures,
};
