describe('getAuthentications', () => {
  it('return a promise resolving to the accessToken', async () => {
    const client = await require('..').client;
    const getAuthentications = require('./getAuthentications');
    const authentications = await getAuthentications(
      client.authenticateWith('laboperator-access-token')
    );

    expect(authentications).to.containSubset([
      {
        accessToken: 'external-access-token',
        userId: '1',
      },
    ]);
  });
});
