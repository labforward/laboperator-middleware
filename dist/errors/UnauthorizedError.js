"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _APIError = _interopRequireDefault(require("./APIError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class UnauthorizedError extends _APIError.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "status", 401);
  }

}

var _default = UnauthorizedError;
exports.default = _default;