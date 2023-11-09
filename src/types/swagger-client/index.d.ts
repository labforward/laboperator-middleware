declare module 'swagger-client' {
  const _fetch: typeof fetch;

  type JSON = any; // eslint-disable-line @typescript-eslint/no-explicit-any

  type Http = typeof _fetch;

  class SwaggerClient {
    constructor();
  }

  const http: Http;
}
