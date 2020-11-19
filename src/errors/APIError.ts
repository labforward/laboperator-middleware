const config = require('../config');

class APIError extends Error {
  constructor(application, message) {
    config.logger.error(`[API][${application}] Error: ${message}`);

    super(message);
  }
}

module.exports = APIError;
