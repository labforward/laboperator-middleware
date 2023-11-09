import fetchRetryFactory, {
  RequestInitWithRetry,
  RequestInitRetryParams,
} from 'fetch-retry';
import { HttpsProxyAgent } from 'https-proxy-agent';
import _ from 'lodash';
import { http } from 'swagger-client';

export { RequestInitWithRetry, RequestInitRetryParams } from 'fetch-retry';

const fetchRetry = fetchRetryFactory(http);

export default ({
  proxy,
  url,
  ...options
}: RequestInitWithRetry & {
  duplex?: 'half';
  proxy?: string;
  url: URL;
}): Promise<Response> => {
  const fetchOptions = proxy
    ? { agent: new HttpsProxyAgent(proxy), ...options }
    : options;
  const retryOptions: RequestInitRetryParams = _.pick(options, [
    'retries',
    'retryDelay',
    'retryOn',
  ]);

  if (options.method === 'POST') fetchOptions.duplex = 'half';

  return _.isEmpty(retryOptions)
    ? http(url, fetchOptions)
    : fetchRetry(url, fetchOptions);
};
