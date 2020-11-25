"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _load = _interopRequireDefault(require("./load"));

var _pathFor = _interopRequireDefault(require("./pathFor"));

var _save = _interopRequireDefault(require("./save"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = key => {
  const path = (0, _pathFor.default)(key);
  return {
    load: (0, _load.default)(path),
    save: (0, _save.default)(path)
  };
};

exports.default = _default;