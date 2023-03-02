"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = callback => (...args) => callback(...args).catch(args[2]);
exports.default = _default;