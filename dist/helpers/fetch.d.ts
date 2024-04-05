/// <reference types="~/types/swagger-client" />
import { FetchOptions, RetryOptions } from 'swagger-client';
export { FetchOptions, RetryOptions } from 'swagger-client';
declare const _default: ({ proxy, ...rest }: FetchOptions & RetryOptions & {
    proxy?: string;
}) => Promise<Response>;
export default _default;
