"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _formData = _interopRequireDefault(require("form-data"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = params => {
  const formData = new _formData.default();
  _lodash.default.each(params, (value, key) => {
    formData.append(_lodash.default.snakeCase(key), value);
  });
  return formData;
};
exports.default = _default;