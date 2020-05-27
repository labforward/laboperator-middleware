const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');
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

config.logger = require('./logger');

module.exports = config;
