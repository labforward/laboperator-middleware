const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');
const url = require('url');
const yaml = require('yaml');

let config;

try {
  config = yaml.parse(fs.readFileSync('./config.yml', { encoding: 'utf8' }));
} catch {
  config = {};
}

const ajv = new Ajv({ useDefaults: true });
const schema = yaml.parse(
  fs.readFileSync(path.resolve(__dirname, '../schema/config.yml'), {
    encoding: 'utf8',
  })
);
const validator = ajv.compile(schema);
const valid = validator(config);

if (!valid) throw validator.errors;

config.laboperator.url = url.parse(config.laboperator.url);
config.laboperator.url.origin = config.laboperator.url.href.replace(
  config.laboperator.url.path,
  ''
);
config.logger = require('./logger');

module.exports = config;
