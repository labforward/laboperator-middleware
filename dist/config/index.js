"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
Object.defineProperty(exports, "logger", {
  enumerable: true,
  get: function () {
    return _logger.default;
  }
});
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _url = _interopRequireDefault(require("url"));
var _ajv = _interopRequireDefault(require("ajv"));
var _ajvFormats = _interopRequireDefault(require("ajv-formats"));
var _lodash = _interopRequireDefault(require("lodash"));
var _yaml = _interopRequireDefault(require("yaml"));
var _logger = _interopRequireDefault(require("./logger"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const config = {
  logger: _logger.default,
  providers: {}
};
try {
  _lodash.default.merge(config.providers, _yaml.default.parse(_fs.default.readFileSync('./config.yml', {
    encoding: 'utf8'
  })));
} catch {
  // do nothing
}
const ajv = (0, _ajvFormats.default)(new _ajv.default({
  useDefaults: true
}));
const schema = _yaml.default.parse(_fs.default.readFileSync(_path.default.resolve(__dirname, '../schema/config.yml'), {
  encoding: 'utf8'
}));
const validator = ajv.compile(schema);
const valid = validator(config.providers);
if (!valid) throw JSON.stringify(validator.errors);
_lodash.default.forEach(config.providers, provider => {
  /* eslint-disable no-param-reassign */
  provider.url = _url.default.parse(provider.url);
  provider.url.origin = provider.url.href.replace(new RegExp(`${_lodash.default.escapeRegExp(provider.url.path)}$`), '');
});
var _default = exports.default = config;