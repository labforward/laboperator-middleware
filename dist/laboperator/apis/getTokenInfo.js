"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _camelcaseKeys = _interopRequireDefault(require("camelcase-keys"));

var _config = _interopRequireDefault(require("../../config"));

var _helpers = require("../../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async token => {
  const url = new URL(_config.default.providers.laboperator.authentication.tokenInfo.url);
  url.searchParams.append('access_token', token);
  const response = await (0, _helpers.fetch)({
    url
  });
  return (0, _camelcaseKeys.default)(response.body, {
    deep: true
  });
};

exports.default = _default;