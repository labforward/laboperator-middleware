"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _APIError = _interopRequireDefault(require("./APIError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AuthorizationDeniedError extends _APIError.default {
  // eslint-disable-next-line camelcase
  constructor(application, query) {
    super(application, query.error_description);

    _defineProperty(this, "status", 200);
  } // denying authorization is not really an error, so it's better to response with status 200


}

var _default = AuthorizationDeniedError;
exports.default = _default;