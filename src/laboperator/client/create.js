const SwaggerClient = require('swagger-client');
const config = require('../../config');
const authentication = require('./authentication');
const { APIError } = require('../../errors');

const initialize = async () => {
  const response = await authentication.fetchToken();

  authentication.update('default', response);
};

module.exports = async () => {
  config.logger.debug('[API] Initializing Laboperator API Client');

  await initialize();

  const client = await new SwaggerClient({
    url: `${config.laboperator.url.href}/documentation.json`,
    ...authentication.authenticateAsUser(),
  });

  if (client.errors.length) {
    throw new APIError('laboperator', `Failed with ${client.errors}`);
  }

  client.authentication = authentication;

  config.logger.debug('[API] Laboperator API Client Initialized');

  return client;
};
