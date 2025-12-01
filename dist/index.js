"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
var _express = _interopRequireDefault(require("express"));
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _config = _interopRequireDefault(require("./config"));
var _helpers = require("./helpers");
var _routes = _interopRequireDefault(require("./routes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const app = (0, _express.default)();
const stream = {
  write: message => _config.default.logger.info(message)
};
app.use((0, _morgan.default)('dev', {
  stream
}));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
(0, _routes.default)(app);
if (process.env.NODE_ENV === 'test') {
  if (_path.default.resolve(__dirname, '../src') !== _path.default.resolve('./src')) {
    (0, _helpers.requireRelative)('./src/routes').default(app);
  }
} else if (_path.default.resolve(__dirname) !== _path.default.resolve('./dist')) {
  (0, _helpers.requireRelative)('./dist/routes').default(app);
}

// default 404 routes
app.use((_req, _res, next) => {
  next((0, _httpErrors.default)(404));
});

// error handler
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  if (status !== 200) _config.default.logger.error(err);
  res.status(status);
  res.json((0, _helpers.jsonResponse)(status, (0, _helpers.getErrorMessage)(err)));
});
var _default = exports.default = app;