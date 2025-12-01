"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = path => () => {
  if (!_fs.default.existsSync(path)) return undefined;
  let data;
  try {
    _config.default.logger.debug(`[STORE] Started loading from ${path}`);
    data = JSON.parse(_fs.default.readFileSync(path).toString());
    _config.default.logger.debug(`[STORE] Completed loading from ${path}`);
  } catch (e) {
    _config.default.logger.debug(`[STORE] Failed loading from ${path}: ${e.message}`);
  }
  return data;
};
exports.default = _default;