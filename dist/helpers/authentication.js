"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _camelcaseKeys = _interopRequireDefault(require("camelcase-keys"));
var _lodash = _interopRequireDefault(require("lodash"));
var _config = _interopRequireDefault(require("../config"));
var _errors = require("../errors");
var _fetch = _interopRequireDefault(require("./fetch"));
var _serializeFormData = _interopRequireDefault(require("./serializeFormData"));
var _stringifyJSONParams = _interopRequireDefault(require("./stringifyJSONParams"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const authentications = {};
const emptyToken = {
  accessToken: '',
  createdAt: 0,
  expiresIn: 0,
  refreshToken: '',
  scope: '',
  tokenType: ''
};
const isTest = process.env.NODE_ENV === 'test';
const headersFor = serializer => {
  switch (serializer) {
    case 'multipart/form-data':
      return {};
    default:
      return {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };
  }
};
const serializerFor = serializer => {
  switch (serializer) {
    case 'multipart/form-data':
      return _serializeFormData.default;
    default:
      return _stringifyJSONParams.default;
  }
};
const toMilliseconds = timestamp => {
  if (_lodash.default.isString(timestamp)) return Number(new Date(timestamp)); // ISO8601 string

  if (timestamp < 1577836800000) return Number(new Date(timestamp * 1000)); // timestamp as seconds

  return Number(new Date(timestamp)); // timestamp as milliseconds
};
const isExpired = token => {
  const createdAt = toMilliseconds(token.createdAt);
  const expiresIn = toMilliseconds(token.expiresIn);
  const expiresAt = createdAt + expiresIn - 600_000; // refresh 10 minutes before expected expiry

  return expiresAt < Number(new Date());
};
const wrapInPromises = object => _lodash.default.mapValues(object, value => Promise.resolve(value));
const unwrapPromises = async object => {
  const unwrapped = {};
  await Promise.all(_lodash.default.map(object, async (value, key) => {
    unwrapped[key] = await value;
  }));
  return unwrapped;
};
const fixturesFor = application => {
  switch (application) {
    case 'laboperator':
      return {
        1: {
          accessToken: 'laboperator-access-token',
          createdAt: Number(new Date()),
          expiresIn: 3600,
          refreshToken: 'laboperator-refresh-token',
          scope: 'read',
          tokenType: 'Bearer'
        }
      };
    default:
      return {};
  }
};
var _default = (application, {
  persisted = false
} = {}) => {
  if (authentications[application]) return authentications[application];
  const tokens = (() => {
    if (persisted) {
      const storage = require('../storage').default(`tokens-${application}`);
      return {
        cache: wrapInPromises(isTest ? fixturesFor(application) : storage.load()),
        save: () => {
          unwrapPromises(tokens.cache).then(storage.save);
        }
      };
    } else {
      return {
        cache: wrapInPromises(isTest ? fixturesFor(application) : {}),
        save: _lodash.default.noop
      };
    }
  })();
  const authentication = {
    authenticateAsUser: async user => {
      const token = await authentication.get(user);
      if (!token) {
        throw new _errors.BadRequestError(application, `User#${user} has not authorize the application`);
      }
      return authentication.authenticateWith(token);
    },
    authenticateWith: token => {
      if (!token) {
        throw new _errors.UnauthorizedError(application, 'Missing valid accessToken');
      }
      return {
        requestInterceptor: request => {
          request.headers = request.headers || {};
          request.headers.Authorization = `Bearer ${token}`;
          return request;
        }
      };
    },
    fetchToken: async (body, options) => {
      const {
        authentication: {
          token: {
            options: tokenOptions,
            serializer,
            ...rest
          }
        }
      } = _config.default.providers[application];
      const response = await (0, _fetch.default)({
        ...rest,
        body: serializerFor(serializer)({
          ...tokenOptions,
          ...body
        }),
        headers: headersFor(serializer),
        method: 'post',
        ...options
      });
      if (!response.ok) {
        throw new _errors.APIError(application, `Failed fetching token: ${response.statusText}`);
      }
      const token = (0, _camelcaseKeys.default)(response.body, {
        deep: true
      });
      return {
        createdAt: new Date().getTime(),
        ...token
      };
    },
    get: async (user = 'default') => {
      let token = await readCacheSafe(user);
      if (token && isExpired(token)) {
        token = await refreshToken(user);
        authentication.store(user, token);
      }
      return token && token.accessToken;
    },
    store: (user, token) => {
      tokens.cache[user] = Promise.resolve(token);
      tokens.save();
    }
  };
  async function readCacheSafe(user) {
    return tokens.cache[user]?.catch(() => emptyToken);
  }
  async function refreshToken(user) {
    const token = await readCacheSafe(user);
    let options;
    if (user === 'default') {
      options = {};
    } else if (token?.refreshToken) {
      options = {
        grantType: 'refresh_token',
        refreshToken: token.refreshToken
      };
    } else {
      throw new _errors.BadRequestError(application, `Missing refresh token for User#${user}`);
    }
    _config.default.logger.debug(`[API][${application}][User#${user}] Starting Refreshing Token`);
    tokens.cache[user] = authentication.fetchToken(options).then(newToken => {
      _config.default.logger.debug(`[API][${application}][User#${user}] Completed Refreshing Token`);
      return newToken;
    }).catch(error => {
      _config.default.logger.debug(`[API][${application}][User#${user}] Failed Refreshing Token`);

      // reset cached rejected promise with what it was to keep the refresh token
      tokens.cache[user] = Promise.resolve(token);
      throw error;
    });
    return tokens.cache[user];
  }
  if (!isTest) authentications[application] = authentication;
  return authentication;
};
exports.default = _default;