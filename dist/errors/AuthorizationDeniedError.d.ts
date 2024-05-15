import APIError from './APIError';
declare class AuthorizationDeniedError extends APIError {
    status: number;
    constructor(application: string, query: {
        error_description?: string;
    });
}
export default AuthorizationDeniedError;
