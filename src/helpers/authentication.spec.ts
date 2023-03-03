import factory from './authentication';

describe('Authentication', () => {
  it('re-resolve previously failing authentication', async () => {
    jest.useFakeTimers().setSystemTime(0);
    const authentication = factory('laboperator');

    jest
      .spyOn(authentication, 'fetchToken')
      .mockImplementation(() => Promise.reject());

    // fake refresh token failure due to e.g. network failure
    jest.useRealTimers();
    await expect(authentication.get('1')).rejects.toBeUndefined();

    jest.restoreAllMocks();

    expect(await authentication.get('1')).toEqual('fresh-access-token');
  });
});
