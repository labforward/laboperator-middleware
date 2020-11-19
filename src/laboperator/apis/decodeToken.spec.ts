const { rejects } = require('assert');

describe('decodeToken', () => {
  it('return a promise resolving to the accessToken', async () => {
    const decodeToken = require('./decodeToken');
    const authentication = await decodeToken('encoded-id');

    expect(authentication).to.containSubset({
      accessToken: 'external-access-token',
      userId: '1',
    });
  });

  it('reject invalid token', async () => {
    const decodeToken = require('./decodeToken');

    await rejects(decodeToken('invalid-id'), { status: 401 });
  });
});
