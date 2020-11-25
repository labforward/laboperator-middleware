import APIError from './APIError';

class BadRequestError extends APIError {
  status = 400;
}

export default BadRequestError;
