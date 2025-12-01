"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = path => data => {
  try {
    _config.default.logger.debug(`[STORE] Started saving into ${path}`);
    _fs.default.writeFileSync(path, JSON.stringify(data));
    _config.default.logger.debug(`[STORE] Completed saving into ${path}`);
  } catch (e) {
    _config.default.logger.debug(`[STORE] Failed saving into ${path}: ${e.message}`);
  }
};
exports.default = _default;