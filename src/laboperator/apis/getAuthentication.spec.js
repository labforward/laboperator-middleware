const { rejects } = require('assert');

describe('getAuthentication', () => {
  it('return a promise resolving to the accessToken', async () => {
    const getAuthentication = require('./getAuthentication');
    const authentication = await getAuthentication('encoded-id');

    expect(authentication).to.containSubset({
      accessToken: 'external-access-token',
      userId: '1',
    });
  });

  it('reject invalid token', async () => {
    const getAuthentication = require('./getAuthentication');

    await rejects(getAuthentication('invalid-id'), { status: 401 });
  });
});
