import _ from 'lodash';

import { AuthorizationDeniedError } from '~/errors';

import getTokenInfo from './getTokenInfo';

export default async (query = {}) => {
  if (!query.code) throw new AuthorizationDeniedError('laboperator', query);

  const client = await require('../client').default;
  const { authentication } = client;

  const token = await authentication.fetchToken({
    grantType: 'authorization_code',
    code: query.code,
  });
  const tokenInfo = await getTokenInfo(token.accessToken);

  authentication.store(tokenInfo.resourceOwnerId, token);
};
