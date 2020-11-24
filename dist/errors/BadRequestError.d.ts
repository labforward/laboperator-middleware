import APIError from './APIError';
declare class BadRequestError extends APIError {
    status: number;
}
export default BadRequestError;
