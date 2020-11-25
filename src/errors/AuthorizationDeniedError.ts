import APIError from './APIError';

class AuthorizationDeniedError extends APIError {
  // eslint-disable-next-line camelcase
  constructor(application: string, query: { error_description?: string }) {
    super(application, query.error_description);
  }

  // denying authorization is not really an error, so it's better to response with status 200
  status = 200;
}

export default AuthorizationDeniedError;
