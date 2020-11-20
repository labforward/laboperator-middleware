import APIError from './APIError';

class UnauthorizedError extends APIError {
  status = 401;
}

export default UnauthorizedError;
