"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const getErrorMessageFromFetchError = e => {
  if (!e.response) return undefined;
  const {
    body
  } = e.response;
  const {
    errors: [error] = []
  } = body || {};
  return error && error.detail || body && body.error_description;
};
const getErrorMessageFromError = e => e.message;
var _default = e => {
  return getErrorMessageFromFetchError(e) || getErrorMessageFromError(e);
};
exports.default = _default;