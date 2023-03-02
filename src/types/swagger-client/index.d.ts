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
    method?: string;
    body?: string | FormData;
    headers?: Record<string, string | undefined>;
    url?: string | URL;
  }

  interface FetchResponse<T = unknown> {
    ok: boolean;
    url: string;
    status: number;
    statusText: string;
    text: string;
    data: string;
    body: T;
    obj: T;
  }

  interface FetchErrorResponse {
    status: number;
    statusCode: number;
    response: FetchResponse<{
      errors?: Array<{ detail: string }>;
      error_description?: string;
    }>;
  }

  type Http = (options: FetchOptions) => Promise<Response>;

  class SwaggerClient {
    constructor();
  }

  const http: Http;
}
