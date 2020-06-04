const config = require('../config');

class APIError extends Error {
  constructor(message) {
    config.logger.error(`[API] Error: ${message}`);

    super(message);
  }
}

module.exports = APIError;
