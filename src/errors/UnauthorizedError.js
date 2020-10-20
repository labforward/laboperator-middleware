const APIError = require('./APIError');

class UnauthorizedError extends APIError {
  constructor(application, message) {
    super(application, message);

    this.status = 401;
  }
}

module.exports = UnauthorizedError;
