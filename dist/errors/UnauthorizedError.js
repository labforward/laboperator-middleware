"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _APIError = _interopRequireDefault(require("./APIError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UnauthorizedError extends _APIError.default {
  status = 401;
}
var _default = exports.default = UnauthorizedError;