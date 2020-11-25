import APIError from './APIError';
declare class UnauthorizedError extends APIError {
    status: number;
}
export default UnauthorizedError;
