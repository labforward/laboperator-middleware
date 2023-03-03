import SwaggerClient from 'swagger-client';

import { APIError } from '~/errors';
import { Authentication } from '~/helpers/authentication';
import config from '~/config';

import authentication from './authentication';

type Constructor = new ({ url }: { url: string }) => Promise<LaboperatorClient>;
export interface LaboperatorClient {
  authentication: Authentication;
  apis: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  errors: Array<string>;
  spec: {
    servers: Array<{ url: string | null }>;
  };
}

const fetchDefaultToken = async () => {
  const response = await authentication.fetchToken(
    {},
    {
      retries: 10,
      retryDelay: (attempt) => {
        const seconds = Math.pow(2, attempt + 1);

        config.logger.debug(
          `[API][laboperator][Attempt#${
            attempt + 1
          }] Failed to connect to Laboperator API! Retrying in ${seconds} seconds`
        );
        return seconds * 1000;
      },
    }
  );

  authentication.store('default', response);
};

export default async (): Promise<LaboperatorClient> => {
  config.logger.debug('[API][laboperator] Initializing API Client');

  await fetchDefaultToken();

  const client: LaboperatorClient =
    await new (SwaggerClient as unknown as Constructor)({
      url: `${config.providers.laboperator.url.origin}/api/v2/documentation.json`,
    });

  if (client.errors.length) {
    throw new APIError('laboperator', `Failed with ${client.errors}`);
  }

  client.spec.servers[0].url = config.providers.laboperator.url.path;
  client.authentication = authentication;

  config.logger.debug('[API][laboperator] API Client Initialized');

  return client;
};
