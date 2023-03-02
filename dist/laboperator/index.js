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
var _apis = _interopRequireWildcard(require("./apis"));
exports.apis = _apis;
var _client = _interopRequireDefault(require("./client"));
var _create = require("./client/create");
var _authentication = require("../helpers/authentication");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }