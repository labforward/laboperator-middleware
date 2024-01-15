import fetchRetryFactory from 'fetch-retry';
import { HttpsProxyAgent } from 'https-proxy-agent';
import _ from 'lodash';
import { FetchOptions, RetryOptions, http } from 'swagger-client';

export { FetchOptions, RetryOptions } from 'swagger-client';

const fetchRetry = fetchRetryFactory(
  http as unknown as (input: RequestInfo | URL) => Promise<Response>,
);

export default ({
  proxy,
  ...rest
}: FetchOptions & RetryOptions & { proxy?: string }): Promise<Response> => {
  const fetchOptions: FetchOptions = proxy
    ? { agent: new HttpsProxyAgent(proxy), ...rest }
    : rest;
  const retryOptions: RetryOptions = _.pick(rest, [
    'retries',
    'retryDelay',
    'retryOn',
  ]);

  return _.isEmpty(retryOptions)
    ? http(fetchOptions)
    : fetchRetry(fetchOptions as unknown as Request, retryOptions);
};
