"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = key => {
  if (!_fs.default.existsSync('./storage')) _fs.default.mkdirSync('./storage');
  return _path.default.resolve(`./storage/${key}.json`);
};

exports.default = _default;