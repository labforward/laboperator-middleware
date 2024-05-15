"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Authentication", {
  enumerable: true,
  get: function () {
    return _authentication.Authentication;
  }
});
Object.defineProperty(exports, "AuthenticationHeaders", {
  enumerable: true,
  get: function () {
    return _authentication.AuthenticationHeaders;
  }
});
Object.defineProperty(exports, "LaboperatorClient", {
  enumerable: true,
  get: function () {
    return _create.LaboperatorClient;
  }
});
exports.apis = void 0;
Object.defineProperty(exports, "client", {
  enumerable: true,
  get: function () {
    return _client.default;
  }
});
var _authentication = require("../helpers/authentication");
var _apis = _interopRequireWildcard(require("./apis"));
exports.apis = _apis;
var _client = _interopRequireDefault(require("./client"));
var _create = require("./client/create");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }