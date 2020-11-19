import _ from 'lodash';
import { http as fetch } from 'swagger-client';
import fetchRetryFactory from 'fetch-retry';
import ProxyAgent from 'https-proxy-agent';

const fetchRetry = fetchRetryFactory(fetch);

export default ({ proxy, ...rest }) => {
  const fetchOptions = proxy ? { agent: new ProxyAgent(proxy), ...rest } : rest;
  const retryOptions = _.pick(rest, ['retries', 'retryDelay', 'retryOn']);

  return _.isEmpty(retryOptions)
    ? fetch(fetchOptions)
    : fetchRetry(fetchOptions, retryOptions);
};
