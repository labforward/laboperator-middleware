const APIError = require('./APIError');

class BadRequestError extends APIError {
  constructor(application, message) {
    super(application, message);

    this.status = 400;
  }
}

module.exports = BadRequestError;
