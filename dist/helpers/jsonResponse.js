"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (code, details = _httpStatusCodes.default.getStatusText(code)) => ({
  code,
  details,
  status: _httpStatusCodes.default.getStatusText(code)
});
exports.default = _default;