const APIError = require('./APIError');

class AuthorizationDeniedError extends APIError {
  constructor(query) {
    super(query.error_description);

    // denying authorization is not really an error, so it's better to response with status 200
    this.status = 200;
  }
}

module.exports = AuthorizationDeniedError;
