import { rejects } from 'assert';

import decodeToken from './decodeToken';

describe('decodeToken', () => {
  it('return a promise resolving to the accessToken', async () => {
    const authentication = await decodeToken('encoded-id');

    expect(authentication).to.containSubset({
      accessToken: 'external-access-token',
      userId: '1',
    });
  });

  it('reject invalid token', async () => {
    await rejects(decodeToken('invalid-id'), { status: 401 });
  });
});
