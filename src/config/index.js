/* eslint-disable no-param-reassign */
const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');
const url = require('url');
const yaml = require('yaml');
const _ = require('lodash');

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

if (!valid) throw JSON.stringify(validator.errors);

_.forEach(config, (provider) => {
  provider.url = url.parse(provider.url);
  provider.url.origin = provider.url.href.replace(
    new RegExp(`${provider.url.path}$`),
    ''
  );
});

config.logger = require('./logger');

module.exports = config;
