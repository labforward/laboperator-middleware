"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _camelcaseKeys = _interopRequireDefault(require("camelcase-keys"));

var _errors = require("../errors");

var _config = _interopRequireDefault(require("../config"));

var _fetch = _interopRequireDefault(require("./fetch"));

var _serializeFormData = _interopRequireDefault(require("./serializeFormData"));

var _stringifyJSONParams = _interopRequireDefault(require("./stringifyJSONParams"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authentications = {};
const isTest = process.env.NODE_ENV === 'test';

const headersFor = serializer => {
  switch (serializer) {
    case 'multipart/form-data':
      return {};

    default:
      return {
        'Content-Type': 'application/json',
        Accept: 'application/json'
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
          createdAt: Number(new Date()),
          accessToken: 'laboperator-access-token',
          tokenType: 'Bearer',
          expiresIn: 3600,
          refreshToken: 'laboperator-refresh-token',
          scope: 'read'
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

  const loadTokens = () => {
    if (persisted) {
      const storage = require('../storage').default(`tokens-${application}`);

      const tokens = {
        cache: wrapInPromises(isTest ? fixturesFor(application) : storage.load()),
        save: () => {
          unwrapPromises(tokens.cache).then(storage.save);
        }
      };
      return tokens;
    } else {
      return {
        cache: {},
        save: _lodash.default.noop
      };
    }
  };

  const tokens = loadTokens();

  const fetchToken = async (body, options) => {
    const {
      authentication
    } = _config.default.providers[application];
    const {
      options: tokenOptions,
      serializer,
      ...rest
    } = authentication.token;
    const response = await (0, _fetch.default)({ ...rest,
      method: 'post',
      body: serializerFor(serializer)({ ...tokenOptions,
        ...body
      }),
      headers: headersFor(serializer),
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
  };

  const refreshToken = async user => {
    _config.default.logger.debug(`[API][${application}] Starting Refreshing Token`);

    tokens.cache[user] = fetchToken(user === 'default' ? {} : {
      grantType: 'refresh_token',
      refreshToken: (await tokens.cache[user]).refreshToken
    }).then(token => {
      _config.default.logger.debug(`[API][${application}] Completed Refreshing Token`);

      return token;
    });
    return tokens.cache[user];
  };

  const store = (user, token) => {
    tokens.cache[user] = Promise.resolve(token);
    tokens.save();
  };

  const get = async (user = 'default') => {
    let token = await tokens.cache[user];

    if (token && isExpired(token)) {
      token = await refreshToken(user);
      store(user, token);
    }

    return token && token.accessToken;
  };

  const authenticateWith = token => {
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
  };

  authentications[application] = {
    authenticateWith,
    authenticateAsUser: async (user) => authenticateWith(await get(user)),
    fetchToken,
    get,
    store
  };
  return authentications[application];
};

exports.default = _default;