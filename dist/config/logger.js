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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const logFormatter = _winston.default.format.printf(info => {
  const {
    timestamp,
    level,
    response,
    stack,
    message
  } = info;
  if (response) {
    // http error
    const {
      status,
      statusText,
      body
    } = response;
    return `${timestamp} ${level}: ${status} ${statusText}
${timestamp} ${level}: ${JSON.stringify(body, undefined, 2)}
${timestamp} ${level}: ${stack}`;
  }
  return `${timestamp} ${level}: ${stack || message}`;
});
const logger = _winston.default.createLogger({
  exitOnError: false,
  level: 'debug',
  format: _winston.default.format.errors({
    stack: true
  }),
  transports: [process.env.NODE_ENV === 'test' ? new _winston.default.transports.File({
    filename: 'log/test.log',
    format: _winston.default.format.combine(_winston.default.format.timestamp(), logFormatter)
  }) : new _winston.default.transports.Console({
    format: _winston.default.format.combine(_winston.default.format.colorize(), _winston.default.format.timestamp(), logFormatter)
  })]
});
var _default = logger;
exports.default = _default;