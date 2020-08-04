const fetch = require('swagger-client').http;
const ProxyAgent = require('https-proxy-agent');

module.exports = ({ proxy, ...rest }) => {
  if (!proxy) return fetch(rest);

  const agent = new ProxyAgent(proxy);

  return fetch({ agent, ...rest });
};
