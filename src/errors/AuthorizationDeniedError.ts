import APIError from './APIError';

class AuthorizationDeniedError extends APIError {
  constructor(application, query) {
    super(application, query.error_description);

    // denying authorization is not really an error, so it's better to response with status 200
    this.status = 200;
  }
}

export default AuthorizationDeniedError;
