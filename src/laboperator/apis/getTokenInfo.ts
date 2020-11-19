import camelCaseKeys from 'camelcase-keys';

import config from '~/config';
import { fetch } from '~/helpers';

export default async (token) => {
  const url = new URL(config.laboperator.authentication.tokenInfo.url);

  url.searchParams.append('access_token', token);

  const response = await fetch({ url });

  return camelCaseKeys(response.body, { deep: true });
};
