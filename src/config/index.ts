import fs from 'fs';
import path from 'path';
import url, { Url } from 'url';

import _ from 'lodash';
import addFormats from 'ajv-formats';
import Ajv from 'ajv';
import yaml from 'yaml';

import logger, { Logger } from './logger';

interface UrlWithOrigin extends Url {
  origin: string;
}

interface Config {
  providers: {
    [provider: string]: {
      url: UrlWithOrigin;
      authentication: {
        token: {
          url: string;
          options: Record<string, string>;
          serializer: string;
        };
        tokenInfo: {
          url: string;
        };
      };
    };
  };
  logger: Logger;
}

const config: Config = { providers: {}, logger };

try {
  _.merge(
    config.providers,
    yaml.parse(fs.readFileSync('./config.yml', { encoding: 'utf8' }))
  );
} catch {
  // do nothing
}

const ajv = addFormats(new Ajv({ useDefaults: true }));
const schema = yaml.parse(
  fs.readFileSync(path.resolve(__dirname, '../schema/config.yml'), {
    encoding: 'utf8',
  })
);
const validator = ajv.compile(schema);
const valid = validator(config.providers);

if (!valid) throw JSON.stringify(validator.errors);

_.forEach(config.providers, (provider) => {
  /* eslint-disable no-param-reassign */
  provider.url = url.parse(
    provider.url as unknown as string
  ) as unknown as UrlWithOrigin;
  provider.url.origin = provider.url.href.replace(
    new RegExp(`${_.escapeRegExp(provider.url.path as string)}$`),
    ''
  );
});

export { logger };
export default config;
