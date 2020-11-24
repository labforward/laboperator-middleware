"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// relative to working directory, so that each specialized middleware
// can inject their customization
var _default = name => // eslint-disable-next-line import/no-dynamic-require
require(_path.default.resolve(name));

exports.default = _default;