/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchMock, { MockMatcherFunction, MockRequest } from 'fetch-mock';
import _ from 'lodash';

import config from '~/config';

import defaultFixtures from './fixtures';

type MockResponseBody = any;

interface Fixture {
  endpoint: string;
  method?: string;
  request?: any;
  response:
    | MockResponseBody
    | {
        body: MockResponseBody;
        headers: Record<string, string>;
        status: number;
      };
}

const mocks: Record<string, Array<Fixture>> = {};

export const addFixtures = (
  provider: string,
  fixtures: Array<Fixture>,
): void => {
  mocks[provider] = [...(mocks[provider] || []), ...fixtures];
};

const headers = { 'Content-Type': 'application/json' };
const normalize = (
  object: Fixture,
  key: 'response' | 'request',
): Fixture[typeof key] => {
  const raw: Fixture[typeof key] = (object || ({} as Fixture))[key || ''] || {};

  if (raw.status) {
    return raw.body ? { ...raw, headers } : raw;
  }

  return { body: raw, headers };
};

const parseBody = (body: string) => {
  try {
    return _.isString(body) ? JSON.parse(body) : body;
  } catch {
    // string, but not json
    return body;
  }
};

const getProvider = (url: string) =>
  _.findKey(mocks, (_provider, key) => url.startsWith(key));

const getMock = (url: string, { body, method }: MockRequest) => {
  const provider = getProvider(url);
  const endpoint = provider && url.replace(provider, '');

  return provider
    ? (mocks[provider] || []).find(
        (mock) =>
          mock.endpoint === endpoint &&
          _.lowerCase(mock.method || 'get') === _.lowerCase(method || 'get') &&
          _.isMatch(parseBody(body as string), normalize(mock, 'request').body),
      )
    : undefined;
};
const matcher: MockMatcherFunction = (url, options) => !!getMock(url, options);
const getResponse = (url: string, options: MockRequest) => {
  const mock = getMock(url, options);

  return mock && normalize(mock, 'response');
};

beforeEach(() => fetchMock.mock(matcher, getResponse));
afterEach(() => fetchMock.restore());

addFixtures(config.providers.laboperator.url.href, defaultFixtures);
addFixtures(config.providers.laboperator.url.origin, defaultFixtures);
