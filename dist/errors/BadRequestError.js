"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _APIError = _interopRequireDefault(require("./APIError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class BadRequestError extends _APIError.default {
  status = 400;
}
var _default = BadRequestError;
exports.default = _default;