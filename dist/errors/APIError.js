"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class APIError extends Error {
  constructor(application, message) {
    _config.default.logger.error(`[API][${application}] Error: ${message}`);
    super(message);
  }
}
var _default = exports.default = APIError;