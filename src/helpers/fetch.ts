import _ from 'lodash';
import createHttpsProxyAgent from 'https-proxy-agent';
import { FetchOptions, RetryOptions, http } from 'swagger-client';
import fetchRetryFactory from 'fetch-retry';

export { FetchOptions, RetryOptions } from 'swagger-client';

const fetchRetry = fetchRetryFactory(
  (http as unknown) as (input: RequestInfo) => Promise<Response>
);

export default ({
  proxy,
  ...rest
}: FetchOptions & RetryOptions & { proxy?: string }): Promise<Response> => {
  const fetchOptions: FetchOptions = proxy
    ? { agent: createHttpsProxyAgent(proxy), ...rest }
    : rest;
  const retryOptions: RetryOptions = _.pick(rest, [
    'retries',
    'retryDelay',
    'retryOn',
  ]);

  return _.isEmpty(retryOptions)
    ? http(fetchOptions)
    : fetchRetry((fetchOptions as unknown) as Request, retryOptions);
};
