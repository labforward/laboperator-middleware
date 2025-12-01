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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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