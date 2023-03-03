"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _getAttributesFromResource = _interopRequireDefault(require("./getAttributesFromResource"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = raw => {
  const resources = raw.data || raw;
  return resources.map(_getAttributesFromResource.default);
};
exports.default = _default;