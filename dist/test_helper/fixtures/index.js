"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _authentications = _interopRequireDefault(require("./authentications"));
var _documentation = _interopRequireDefault(require("./documentation"));
var _oauth = _interopRequireDefault(require("./oauth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = exports.default = [..._authentications.default, ..._documentation.default, ..._oauth.default];