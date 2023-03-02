"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _getAttributesFromResource = _interopRequireDefault(require("./getAttributesFromResource"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = async id => {
  const client = await require('../client').default;
  const response = await client.apis.authentications.getAuthentication({
    id
  }, await client.authentication.authenticateAsUser());
  return (0, _getAttributesFromResource.default)(response.body);
};
exports.default = _default;