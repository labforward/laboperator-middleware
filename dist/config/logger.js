"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Logger", {
  enumerable: true,
  get: function () {
    return _winston.Logger;
  }
});
exports.default = void 0;
var _winston = _interopRequireWildcard(require("winston"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const logFormatter = _winston.default.format.printf(info => {
  const {
    level,
    message,
    response,
    stack,
    timestamp
  } = info;
  if (response) {
    // http error
    const {
      body,
      status,
      statusText
    } = response;
    return `${timestamp} ${level}: ${status} ${statusText}
${timestamp} ${level}: ${JSON.stringify(body, undefined, 2)}
${timestamp} ${level}: ${stack}`;
  }
  return `${timestamp} ${level}: ${stack || message}`;
});
const logger = _winston.default.createLogger({
  exitOnError: false,
  format: _winston.default.format.errors({
    stack: true
  }),
  level: 'debug',
  transports: [process.env.NODE_ENV === 'test' ? new _winston.default.transports.File({
    filename: 'log/test.log',
    format: _winston.default.format.combine(_winston.default.format.timestamp(), logFormatter)
  }) : new _winston.default.transports.Console({
    format: _winston.default.format.combine(_winston.default.format.colorize(), _winston.default.format.timestamp(), logFormatter)
  })]
});
var _default = exports.default = logger;