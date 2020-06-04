const SwaggerClient = require('swagger-client');
const config = require('../../config');
const authentication = require('./authentication');
const { APIError } = require('../../errors');

const initialize = async () => {
  const response = await authentication.fetchToken();

  authentication.update('default', { laboperator: response });
};

const authenticateWith = (token) => ({
  requestInterceptor: (request) => {
    request.headers.Authorization = `Bearer ${token}`;

    return request;
  },
});

const authenticateAsUser = (user = 'default') =>
  authenticateWith(authentication.get(user, 'laboperator'));

module.exports = async () => {
  config.logger.debug('[API] Initializing Laboperator API Client');

  await initialize();

  const client = await new SwaggerClient({
    url: `${config.laboperator.url.href}/documentation.json`,
    ...authenticateAsUser(),
  });

  if (client.errors.length) throw new APIError(`Failed with ${client.errors}`);

  client.authentication = authentication;
  client.authenticateAsUser = authenticateAsUser;
  client.authenticateWith = authenticateWith;

  config.logger.debug('[API] Laboperator API Client Initialized');

  return client;
};
