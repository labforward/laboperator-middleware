"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _formData = _interopRequireDefault(require("form-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = params => {
  const formData = new _formData.default();

  _lodash.default.each(params, (value, key) => {
    formData.append(_lodash.default.snakeCase(key), value);
  });

  return formData;
};

exports.default = _default;