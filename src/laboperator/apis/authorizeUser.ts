import { AuthorizationDeniedError } from '~/errors';

import getTokenInfo from './getTokenInfo';

export default async (
  query: { code?: string; error_description?: string } = {},
): Promise<void> => {
  if (!query.code) throw new AuthorizationDeniedError('laboperator', query);

  const client = await require('../client').default;
  const { authentication } = client;

  const token = await authentication.fetchToken({
    code: query.code,
    grantType: 'authorization_code',
  });
  const tokenInfo = await getTokenInfo(token.accessToken);

  authentication.store(tokenInfo.resourceOwnerId, token);
};
