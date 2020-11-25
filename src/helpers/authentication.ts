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
  get: (user: string) => Promise<string>;
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

  const loadTokens = () => {
    if (persisted) {
      const storage = require('../storage').default(`tokens-${application}`);
      const tokens = {
        cache: wrapInPromises(
          isTest ? fixturesFor(application) : storage.load()
        ),
        save: () => {
          unwrapPromises(tokens.cache).then(storage.save);
        },
      };

      return tokens;
    } else {
      return {
        cache: {},
        save: _.noop,
      };
    }
  };
  const tokens: Tokens = loadTokens();

  const fetchToken = async (
    body: Record<string, string>,
    options?: FetchOptions & RetryOptions
  ): Promise<Token> => {
    const { authentication } = config.providers[application];
    const { options: tokenOptions, serializer, ...rest } = authentication.token;
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
  };

  const refreshToken = async (user: string) => {
    config.logger.debug(`[API][${application}] Starting Refreshing Token`);

    tokens.cache[user] = fetchToken(
      user === 'default'
        ? {}
        : {
            grantType: 'refresh_token',
            refreshToken: (await tokens.cache[user]).refreshToken,
          }
    ).then((token) => {
      config.logger.debug(`[API][${application}] Completed Refreshing Token`);

      return token;
    });

    return tokens.cache[user];
  };

  const store = (user: string, token: Token): void => {
    tokens.cache[user] = Promise.resolve(token);
    tokens.save();
  };

  const get = async (user = 'default') => {
    let token = await tokens.cache[user];

    if (token && isExpired(token)) {
      token = await refreshToken(user);
      store(user, token);
    }

    return token && token.accessToken;
  };

  const authenticateWith = (token: string) => {
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
  };

  authentications[application] = {
    authenticateWith,
    authenticateAsUser: async (user: string): Promise<AuthenticationHeaders> =>
      authenticateWith(await get(user)),
    fetchToken,
    get,
    store,
  };

  return authentications[application];
};
