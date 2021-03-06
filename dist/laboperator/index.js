"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "client", {
  enumerable: true,
  get: function () {
    return _client.default;
  }
});
Object.defineProperty(exports, "LaboperatorClient", {
  enumerable: true,
  get: function () {
    return _create.LaboperatorClient;
  }
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
exports.apis = void 0;

var _apis = _interopRequireWildcard(require("./apis"));

exports.apis = _apis;

var _client = _interopRequireDefault(require("./client"));

var _create = require("./client/create");

var _authentication = require("../helpers/authentication");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }