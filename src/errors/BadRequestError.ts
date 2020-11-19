import APIError from './APIError';

class BadRequestError extends APIError {
  constructor(application, message) {
    super(application, message);

    this.status = 400;
  }
}

export default BadRequestError;
