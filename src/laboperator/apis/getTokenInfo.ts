import camelCaseKeys from 'camelcase-keys';

import config from '~/config';
import { fetch } from '~/helpers';

interface TokenInfo {
  resourceOwnerId: string;
}

export default async (token: string): Promise<TokenInfo> => {
  const url = new URL(
    config.providers.laboperator.authentication.tokenInfo.url
  );

  url.searchParams.append('access_token', token);

  const response = await fetch({ url });

  return camelCaseKeys<TokenInfo>(response.body as unknown as TokenInfo, {
    deep: true,
  });
};
