import _ from 'lodash';
import camelCaseKeys from 'camelcase-keys';

import { APIError, UnauthorizedError } from '~/errors';
import config from '~/config';

import fetch, { FetchOptions, RetryOptions } from './fetch';
import serializeFormData from './serializeFormData';
import stringifyJSONParams from './stringifyJSONParams';

export interface AuthenticationHeaders {
  requestInterceptor: (options: FetchOptions) => FetchOptions;
}
export interface Authentication {
  authenticateWith: (token: string) => AuthenticationHeaders;
  authenticateAsUser: (user: string) => Promise<AuthenticationHeaders>;
  fetchToken: (
    body: Record<string, string>,
    options?: FetchOptions & RetryOptions
  ) => Promise<Token>;
  get: (user?: string) => Promise<string>;
  store: (user: string, token: Token) => void;
}

interface TokenWithOptionalCreatedAt {
  accessToken: string;
  refreshToken: string;
  createdAt?: string | number;
  expiresIn: string | number;
}

interface Token extends TokenWithOptionalCreatedAt {
  createdAt: string | number;
}

interface Tokens {
  cache: Record<string, Promise<Token>>;
  save: () => void;
}

const authentications: Record<string, Authentication> = {};
const isTest = process.env.NODE_ENV === 'test';

const headersFor = (serializer: string) => {
  switch (serializer) {
    case 'multipart/form-data':
      return {};
    default:
      return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
  }
};

const serializerFor = (serializer: string) => {
  switch (serializer) {
    case 'multipart/form-data':
      return serializeFormData;
    default:
      return stringifyJSONParams;
  }
};

const toMilliseconds = (timestamp: string | number) => {
  if (_.isString(timestamp)) return Number(new Date(timestamp)); // ISO8601 string

  if (timestamp < 1577836800000) return Number(new Date(timestamp * 1000)); // timestamp as seconds

  return Number(new Date(timestamp)); // timestamp as milliseconds
};

const isExpired = (token: Token) => {
  const createdAt = toMilliseconds(token.createdAt);
  const expiresIn = toMilliseconds(token.expiresIn);
  const expiresAt = createdAt + expiresIn - 600_000; // refresh 10 minutes before expected expiry

  return expiresAt < Number(new Date());
};

const wrapInPromises = (object: Record<string, Token>) =>
  _.mapValues(object, (value) => Promise.resolve(value));

const unwrapPromises = async (object: Record<string, Promise<Token>>) => {
  const unwrapped: Record<string, Token> = {};

  await Promise.all(
    _.map(object, async (value, key) => {
      unwrapped[key] = await value;
    })
  );

  return unwrapped;
};

const fixturesFor = (application: string) => {
  switch (application) {
    case 'laboperator':
      return {
        1: {
          createdAt: Number(new Date()),
          accessToken: 'laboperator-access-token',
          tokenType: 'Bearer',
          expiresIn: 3600,
          refreshToken: 'laboperator-refresh-token',
          scope: 'read',
        },
      };
    default:
      return {};
  }
};

export default (
  application: string,
  { persisted = false } = {}
): Authentication => {
  if (authentications[application]) return authentications[application];

  const tokens: Tokens = (() => {
    if (persisted) {
      const storage = require('../storage').default(`tokens-${application}`);

      return {
        cache: wrapInPromises(
          isTest ? fixturesFor(application) : storage.load()
        ),
        save: () => {
          unwrapPromises(tokens.cache).then(storage.save);
        },
      };
    } else {
      return {
        cache: {},
        save: _.noop,
      };
    }
  })();

  const authentication = {
    authenticateWith: (token: string) => {
      if (!token) {
        throw new UnauthorizedError(application, 'Missing valid accessToken');
      }

      return {
        requestInterceptor: (request: FetchOptions) => {
          request.headers = request.headers || {};
          request.headers.Authorization = `Bearer ${token}`;

          return request;
        },
      };
    },
    authenticateAsUser: async (user: string): Promise<AuthenticationHeaders> =>
      authentication.authenticateWith(await authentication.get(user)),
    fetchToken: async (
      body: Record<string, string>,
      options?: FetchOptions & RetryOptions
    ): Promise<Token> => {
      const {
        authentication: {
          token: { options: tokenOptions, serializer, ...rest },
        },
      } = config.providers[application];

      const response = await fetch({
        ...rest,
        method: 'post',
        body: serializerFor(serializer)({
          ...tokenOptions,
          ...body,
        }),
        headers: headersFor(serializer),
        ...options,
      });

      if (!response.ok) {
        throw new APIError(
          application,
          `Failed fetching token: ${response.statusText}`
        );
      }

      const token = camelCaseKeys(
        response.body as Parameters<typeof camelCaseKeys>[0],
        { deep: true }
      );

      return {
        createdAt: new Date().getTime(),
        ...(token as TokenWithOptionalCreatedAt),
      };
    },
    get: async (user = 'default') => {
      let token = await tokens.cache[user];

      if (token && isExpired(token)) {
        token = await refreshToken(user);
        authentication.store(user, token);
      }

      return token && token.accessToken;
    },
    store: (user: string, token: Token): void => {
      tokens.cache[user] = Promise.resolve(token);
      tokens.save();
    },
  };

  async function refreshToken(user: string) {
    config.logger.debug(`[API][${application}] Starting Refreshing Token`);

    tokens.cache[user] = authentication
      .fetchToken(
        user === 'default'
          ? {}
          : {
              grantType: 'refresh_token',
              refreshToken: (await tokens.cache[user]).refreshToken,
            }
      )
      .then((token) => {
        config.logger.debug(`[API][${application}] Completed Refreshing Token`);

        return token;
      });

    return tokens.cache[user];
  }

  authentications[application] = authentication;

  return authentications[application];
};
