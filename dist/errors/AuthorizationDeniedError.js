"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _APIError = _interopRequireDefault(require("./APIError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class AuthorizationDeniedError extends _APIError.default {
  // denying authorization is not really an error, so it's better to response with status 200
  status = 200;
  constructor(application, query) {
    super(application, query.error_description);
  }
}
var _default = exports.default = AuthorizationDeniedError;