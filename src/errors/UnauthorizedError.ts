import APIError from './APIError';

class UnauthorizedError extends APIError {
  constructor(application, message) {
    super(application, message);

    this.status = 401;
  }
}

export default UnauthorizedError;
