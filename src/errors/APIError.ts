import config from '~/config';

class APIError extends Error {
  constructor(application, message) {
    config.logger.error(`[API][${application}] Error: ${message}`);

    super(message);
  }
}

export default APIError;
