"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _snakecaseKeys = _interopRequireDefault(require("snakecase-keys"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = params => JSON.stringify((0, _snakecaseKeys.default)(params, {
  deep: true
}));

exports.default = _default;