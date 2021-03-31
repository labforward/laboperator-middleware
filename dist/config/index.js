"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "logger", {
  enumerable: true,
  get: function () {
    return _logger.default;
  }
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _url = _interopRequireDefault(require("url"));

var _lodash = _interopRequireDefault(require("lodash"));

var _ajv = _interopRequireDefault(require("ajv"));

var _yaml = _interopRequireDefault(require("yaml"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = {
  providers: {},
  logger: _logger.default
};

try {
  _lodash.default.merge(config.providers, _yaml.default.parse(_fs.default.readFileSync('./config.yml', {
    encoding: 'utf8'
  })));
} catch {// do nothing
}

const ajv = new _ajv.default({
  useDefaults: true
});

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

var _default = config;
exports.default = _default;