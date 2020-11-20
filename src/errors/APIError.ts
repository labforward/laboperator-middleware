import config from '~/config';

class APIError extends Error {
  constructor(application: string, message?: string) {
    config.logger.error(`[API][${application}] Error: ${message}`);

    super(message);
  }
}

export default APIError;
