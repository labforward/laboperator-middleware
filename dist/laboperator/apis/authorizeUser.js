"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _errors = require("../../errors");
var _getTokenInfo = _interopRequireDefault(require("./getTokenInfo"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = async (query = {}) => {
  if (!query.code) throw new _errors.AuthorizationDeniedError('laboperator', query);
  const client = await require('../client').default;
  const {
    authentication
  } = client;
  const token = await authentication.fetchToken({
    code: query.code,
    grantType: 'authorization_code'
  });
  const tokenInfo = await (0, _getTokenInfo.default)(token.accessToken);
  authentication.store(tokenInfo.resourceOwnerId, token);
};
exports.default = _default;