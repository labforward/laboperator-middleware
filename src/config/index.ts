import fs from 'fs';
import path from 'path';
import url from 'url';

import _ from 'lodash';
import Ajv from 'ajv';
import yaml from 'yaml';

import logger from './logger';

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
  /* eslint-disable no-param-reassign */
  provider.url = url.parse(provider.url);
  provider.url.origin = provider.url.href.replace(
    new RegExp(`${provider.url.path}$`),
    ''
  );
});

config.logger = logger;

export { logger };
export default config;
