import { FetchOptions, RetryOptions } from './fetch';
export interface AuthenticationHeaders {
    requestInterceptor: (options: FetchOptions) => FetchOptions;
}
export interface Authentication {
    authenticateAsUser: (user: string) => Promise<AuthenticationHeaders>;
    authenticateWith: (token: string) => AuthenticationHeaders;
    fetchToken: (body: Record<string, string>, options?: FetchOptions & RetryOptions) => Promise<Token>;
    get: (user?: string) => Promise<string>;
    store: (user: string, token: Token) => void;
}
interface TokenWithOptionalCreatedAt {
    accessToken: string;
    createdAt?: string | number;
    expiresIn: string | number;
    refreshToken: string;
    scope: string;
    tokenType: string;
}
interface Token extends TokenWithOptionalCreatedAt {
    createdAt: string | number;
}
declare const _default: (application: string, { persisted }?: {
    persisted?: boolean | undefined;
}) => Authentication;
export default _default;
