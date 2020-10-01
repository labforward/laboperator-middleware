const SwaggerClient = require('swagger-client');
const config = require('../../config');
const authentication = require('./authentication');
const { APIError } = require('../../errors');

const initialize = async () => {
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

module.exports = async () => {
  config.logger.debug('[API][laboperator] Initializing API Client');

  await initialize();

  const client = await new SwaggerClient({
    url: `${config.laboperator.url.href}/documentation.json`,
    ...(await authentication.authenticateAsUser()),
  });

  if (client.errors.length) {
    throw new APIError('laboperator', `Failed with ${client.errors}`);
  }

  client.authentication = authentication;

  config.logger.debug('[API][laboperator] API Client Initialized');

  return client;
};
