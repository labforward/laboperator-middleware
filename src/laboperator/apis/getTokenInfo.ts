const camelCaseKeys = require('camelcase-keys');
const config = require('../../config');
const { fetch } = require('../../helpers');

module.exports = async (token) => {
  const url = new URL(config.laboperator.authentication.tokenInfo.url);

  url.searchParams.append('access_token', token);

  const response = await fetch({ url });

  return camelCaseKeys(response.body, { deep: true });
};
