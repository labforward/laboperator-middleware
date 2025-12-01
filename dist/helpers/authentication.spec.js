"use strict";

var _authentication = _interopRequireDefault(require("./authentication"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe('Authentication', () => {
  it('re-resolve previously failing authentication', async () => {
    jest.useFakeTimers().setSystemTime(0);
    const authentication = (0, _authentication.default)('laboperator');
    jest.spyOn(authentication, 'fetchToken').mockImplementation(() => Promise.reject());

    // fake refresh token failure due to e.g. network failure
    jest.useRealTimers();
    await expect(authentication.get('1')).rejects.toBeUndefined();
    jest.restoreAllMocks();
    expect(await authentication.get('1')).toEqual('fresh-access-token');
  });
});