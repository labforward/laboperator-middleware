"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _supertest = _interopRequireDefault(require("supertest"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = () => (0, _supertest.default)(require('..').default);
exports.default = _default;