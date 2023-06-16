declare module 'swagger-client' {
  import FormData from 'form-data';
  import { HttpsProxyAgent } from 'https-proxy-agent';

  type JSON = any; // eslint-disable-line @typescript-eslint/no-explicit-any

  interface RetryOptions {
    retries?: number;
    retryDelay?: (attempt: number) => number;
  }

  interface FetchOptions {
    agent?: HttpsProxyAgent;
    body?: string | FormData;
    headers?: Record<string, string | undefined>;
    method?: string;
    url?: string | URL;
  }

  interface FetchResponse<T = unknown> {
    body: T;
    data: string;
    obj: T;
    ok: boolean;
    status: number;
    statusText: string;
    text: string;
    url: string;
  }

  interface FetchErrorResponse {
    response: FetchResponse<{
      error_description?: string;
      errors?: Array<{ detail: string }>;
    }>;
    status: number;
    statusCode: number;
  }

  type Http = (options: FetchOptions) => Promise<Response>;

  class SwaggerClient {
    constructor();
  }

  const http: Http;
}
