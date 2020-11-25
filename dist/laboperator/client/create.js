"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _swaggerClient = _interopRequireDefault(require("swagger-client"));

var _errors = require("../../errors");

var _config = _interopRequireDefault(require("../../config"));

var _authentication = _interopRequireDefault(require("./authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fetchDefaultToken = async () => {
  const response = await _authentication.default.fetchToken({}, {
    retries: 10,
    retryDelay: attempt => {
      const seconds = Math.pow(2, attempt + 1);

      _config.default.logger.debug(`[API][laboperator][Attempt#${attempt + 1}] Failed to connect to Laboperator API! Retrying in ${seconds} seconds`);

      return seconds * 1000;
    }
  });

  _authentication.default.store('default', response);
};

var _default = async () => {
  _config.default.logger.debug('[API][laboperator] Initializing API Client');

  await fetchDefaultToken();
  const client = await new _swaggerClient.default({
    url: `${_config.default.providers.laboperator.url.origin}/api/v2/documentation.json`
  });

  if (client.errors.length) {
    throw new _errors.APIError('laboperator', `Failed with ${client.errors}`);
  }

  client.spec.servers[0].url = _config.default.providers.laboperator.url.path;
  client.authentication = _authentication.default;

  _config.default.logger.debug('[API][laboperator] API Client Initialized');

  return client;
};

exports.default = _default;