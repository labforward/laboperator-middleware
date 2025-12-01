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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }