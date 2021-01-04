"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFixtures = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _fetchMock = _interopRequireDefault(require("fetch-mock"));

var _config = _interopRequireDefault(require("../config"));

var _fixtures = _interopRequireDefault(require("./fixtures"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable mocha/no-exports */

/* eslint-disable @typescript-eslint/no-explicit-any */
const mocks = {}; // eslint-disable-next-line import/prefer-default-export

const addFixtures = (provider, fixtures) => {
  mocks[provider] = [...(mocks[provider] || []), ...fixtures];
};

exports.addFixtures = addFixtures;
const headers = {
  'Content-Type': 'application/json'
};

const normalize = (object, key) => {
  const raw = (object || {})[key || ''] || {};

  if (raw.status) {
    return raw.body ? { ...raw,
      headers
    } : raw;
  }

  return {
    headers,
    body: raw
  };
};

const parseBody = body => {
  try {
    return _lodash.default.isString(body) ? JSON.parse(body) : body;
  } catch {
    // string, but not json
    return body;
  }
};

const getProvider = url => _lodash.default.findKey(mocks, (_provider, key) => url.startsWith(key));

const getMock = (url, {
  body,
  method
}) => {
  const provider = getProvider(url);
  const endpoint = provider && url.replace(provider, '');
  return provider ? (mocks[provider] || []).find(mock => mock.endpoint === endpoint && _lodash.default.lowerCase(mock.method || 'get') === _lodash.default.lowerCase(method || 'get') && _lodash.default.isMatch(parseBody(body), normalize(mock, 'request').body)) : undefined;
};

const matcher = (url, options) => !!getMock(url, options);

const getResponse = (url, options) => {
  const mock = getMock(url, options);
  return mock && normalize(mock, 'response');
};

beforeEach(() => _fetchMock.default.mock(matcher, getResponse));
afterEach(() => _fetchMock.default.restore());
addFixtures(_config.default.providers.laboperator.url.href, _fixtures.default);
addFixtures(_config.default.providers.laboperator.url.origin, _fixtures.default);