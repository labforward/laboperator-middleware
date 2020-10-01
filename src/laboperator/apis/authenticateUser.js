const _ = require('lodash');
const getTokenInfo = require('./getTokenInfo');
const { AuthorizationDeniedError } = require('../../errors');

module.exports = async (query = {}) => {
  if (!query.code) throw new AuthorizationDeniedError('laboperator', query);

  const client = await require('../client');
  const { authentication } = client;

  const token = await authentication.fetchToken({
    grantType: 'authorization_code',
    code: query.code,
  });
  const tokenInfo = await getTokenInfo(token.accessToken);

  authentication.store(tokenInfo.resourceOwnerId, token);
};
