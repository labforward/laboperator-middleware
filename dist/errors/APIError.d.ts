declare class APIError extends Error {
    constructor(application: string, message?: string);
}
export default APIError;
