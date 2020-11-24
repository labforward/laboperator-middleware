import APIError from './APIError';
declare class AuthorizationDeniedError extends APIError {
    constructor(application: string, query: {
        error_description?: string;
    });
    status: number;
}
export default AuthorizationDeniedError;
