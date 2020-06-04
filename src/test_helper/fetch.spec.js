const fetchMock = require('fetch-mock');
const _ = require('lodash');
const path = require('path');
const config = require('../config');
const helpers = require('../helpers');

let mocks = require('./fixtures');

if (path.resolve(__dirname) !== path.resolve('./src/test_helper')) {
  mocks = [
    ...mocks,
    ...helpers.requireRelative('./src/test_helper/fixtures'), // additional fixtures added by the specialized middleware
  ];
}

const headers = { 'Content-Type': 'application/json' };
const normalize = (object, key) => {
  const raw = (object || {})[key] || {};

  if (raw.status) {
    return raw.body ? { ...raw, headers } : raw;
  }

  return { headers, body: raw };
};

const getEndpoint = (url) =>
  url
    .replace(config.laboperator.url.origin, '')
    .replace(config.laboperator.url.path, '');

const getMock = (endpoint, { body }) =>
  mocks.find(
    (mock) =>
      mock.endpoint === endpoint &&
      _.isMatch(
        _.isString(body) ? JSON.parse(body) : body,
        normalize(mock, 'request').body
      )
  );
const matcher = (url, options) => !!getMock(getEndpoint(url), options);
const getResponse = (url, options) =>
  normalize(getMock(getEndpoint(url), options), 'response');

beforeEach(() => fetchMock.mock(matcher, getResponse));
afterEach(() => fetchMock.restore());
