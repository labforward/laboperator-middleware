const _ = require('lodash');
const fetch = require('swagger-client').http;
const fetchRetry = require('fetch-retry')(fetch);
const ProxyAgent = require('https-proxy-agent');

module.exports = ({ proxy, ...rest }) => {
  const fetchOptions = proxy ? { agent: new ProxyAgent(proxy), ...rest } : rest;
  const retryOptions = _.pick(rest, ['retries', 'retryDelay', 'retryOn']);

  return _.isEmpty(retryOptions)
    ? fetch(fetchOptions)
    : fetchRetry(fetchOptions, retryOptions);
};
