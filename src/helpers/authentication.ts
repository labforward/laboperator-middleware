import camelCaseKeys from 'camelcase-keys';
import _ from 'lodash';

import config from '~/config';
import { APIError, BadRequestError, UnauthorizedError } from '~/errors';

import fetch, { FetchOptions, RetryOptions } from './fetch';
import serializeFormData from './serializeFormData';
import stringifyJSONParams from './stringifyJSONParams';

export interface AuthenticationHeaders {
  requestInterceptor: (options: FetchOptions) => FetchOptions;
}
export interface Authentication {
  authenticateAsUser: (user: string) => Promise<AuthenticationHeaders>;
  authenticateWith: (token: string) => AuthenticationHeaders;
  fetchToken: (
    body: Record<string, string>,
    options?: FetchOptions & RetryOptions,
  ) => Promise<Token>;
  get: (user?: string) => Promise<string>;
  store: (user: string, token: Token) => void;
}

interface TokenWithOptionalCreatedAt {
  accessToken: string;
  createdAt?: string | number;
  expiresIn: string | number;
  refreshToken: string;
  scope: string;
  tokenType: string;
}

interface Token extends TokenWithOptionalCreatedAt {
  createdAt: string | number;
}

interface Tokens {
  cache: Record<string, Promise<Token>>;
  save: () => void;
}

const authentications: Record<string, Authentication> = {};
const emptyToken: Token = {
  accessToken: '',
  createdAt: 0,
  expiresIn: 0,
  refreshToken: '',
  scope: '',
  tokenType: '',
};
const isTest = process.env.NODE_ENV === 'test';

const headersFor = (serializer: string) => {
  switch (serializer) {
    case 'multipart/form-data':
      return {};
    default:
      return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
    }),
  );

  return unwrapped;
};

const fixturesFor = (application: string): Record<string, Token> => {
  switch (application) {
    case 'laboperator':
      return {
        1: {
          accessToken: 'laboperator-access-token',
          createdAt: Number(new Date()),
          expiresIn: 3600,
          refreshToken: 'laboperator-refresh-token',
          scope: 'read',
          tokenType: 'Bearer',
        },
      };
    default:
      return {};
  }
};

export default (
  application: string,
  { persisted = false } = {},
): Authentication => {
  if (authentications[application]) return authentications[application];

  const tokens: Tokens = (() => {
    if (persisted) {
      const storage = require('../storage').default(`tokens-${application}`);

      return {
        cache: wrapInPromises(
          isTest ? fixturesFor(application) : storage.load(),
        ),
        save: () => {
          unwrapPromises(tokens.cache).then(storage.save);
        },
      };
    } else {
      return {
        cache: wrapInPromises(isTest ? fixturesFor(application) : {}),
        save: _.noop,
      };
    }
  })();

  const authentication = {
    authenticateAsUser: async (
      user: string,
    ): Promise<AuthenticationHeaders> => {
      const token = await authentication.get(user);

      if (!token) {
        throw new BadRequestError(
          application,
          `User#${user} has not authorize the application`,
        );
      }

      return authentication.authenticateWith(token);
    },
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
    fetchToken: async (
      body: Record<string, string>,
      options?: FetchOptions & RetryOptions,
    ): Promise<Token> => {
      const {
        authentication: {
          token: { options: tokenOptions, serializer, ...rest },
        },
      } = config.providers[application];

      const response = await fetch({
        ...rest,
        body: serializerFor(serializer)({
          ...tokenOptions,
          ...body,
        }),
        headers: headersFor(serializer),
        method: 'post',
        ...options,
      });

      if (!response.ok) {
        throw new APIError(
          application,
          `Failed fetching token: ${response.statusText}`,
        );
      }

      const token = camelCaseKeys(
        response.body as unknown as Parameters<typeof camelCaseKeys>[0],
        { deep: true },
      );

      return {
        createdAt: new Date().getTime(),
        ...(token as unknown as TokenWithOptionalCreatedAt),
      };
    },
    get: async (user = 'default') => {
      let token = await readCacheSafe(user);

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

  async function readCacheSafe(user: string) {
    return tokens.cache[user]?.catch(() => emptyToken);
  }

  async function refreshToken(user: string) {
    const token = await readCacheSafe(user);
    let options;

    if (user === 'default') {
      options = {};
    } else if (token?.refreshToken) {
      options = {
        grantType: 'refresh_token',
        refreshToken: token.refreshToken,
      };
    } else {
      throw new BadRequestError(
        application,
        `Missing refresh token for User#${user}`,
      );
    }

    config.logger.debug(
      `[API][${application}][User#${user}] Starting Refreshing Token`,
    );

    tokens.cache[user] = authentication
      .fetchToken(options)
      .then((newToken) => {
        config.logger.debug(
          `[API][${application}][User#${user}] Completed Refreshing Token`,
        );

        return newToken;
      })
      .catch((error) => {
        config.logger.debug(
          `[API][${application}][User#${user}] Failed Refreshing Token`,
        );

        // reset cached rejected promise with what it was to keep the refresh token
        tokens.cache[user] = Promise.resolve(token);

        throw error;
      });

    return tokens.cache[user];
  }

  if (!isTest) authentications[application] = authentication;

  return authentication;
};
