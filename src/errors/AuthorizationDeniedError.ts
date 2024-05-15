import APIError from './APIError';

class AuthorizationDeniedError extends APIError {
  // denying authorization is not really an error, so it's better to response with status 200
  status = 200;

  constructor(application: string, query: { error_description?: string }) {
    super(application, query.error_description);
  }
}

export default AuthorizationDeniedError;
