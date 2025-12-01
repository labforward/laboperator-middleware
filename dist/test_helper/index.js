"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  server: true
};
Object.defineProperty(exports, "server", {
  enumerable: true,
  get: function () {
    return _server.default;
  }
});
var _fetch = require("./fetch.spec");
Object.keys(_fetch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _fetch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fetch[key];
    }
  });
});
var _server = _interopRequireDefault(require("./server.spec"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }