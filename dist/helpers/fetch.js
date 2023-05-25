"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FetchOptions", {
  enumerable: true,
  get: function () {
    return _swaggerClient.FetchOptions;
  }
});
Object.defineProperty(exports, "RetryOptions", {
  enumerable: true,
  get: function () {
    return _swaggerClient.RetryOptions;
  }
});
exports.default = void 0;
var _fetchRetry = _interopRequireDefault(require("fetch-retry"));
var _httpsProxyAgent = _interopRequireDefault(require("https-proxy-agent"));
var _lodash = _interopRequireDefault(require("lodash"));
var _swaggerClient = require("swagger-client");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const fetchRetry = (0, _fetchRetry.default)(_swaggerClient.http);
var _default = ({
  proxy,
  ...rest
}) => {
  const fetchOptions = proxy ? {
    agent: (0, _httpsProxyAgent.default)(proxy),
    ...rest
  } : rest;
  const retryOptions = _lodash.default.pick(rest, ['retries', 'retryDelay', 'retryOn']);
  return _lodash.default.isEmpty(retryOptions) ? (0, _swaggerClient.http)(fetchOptions) : fetchRetry(fetchOptions, retryOptions);
};
exports.default = _default;