"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class APIError extends Error {
  constructor(application, message) {
    _config.default.logger.error(`[API][${application}] Error: ${message}`);
    super(message);
  }
}
var _default = APIError;
exports.default = _default;