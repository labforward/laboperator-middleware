"use strict";

var _assert = require("assert");
var _decodeToken = _interopRequireDefault(require("./decodeToken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe('decodeToken', () => {
  it('return a promise resolving to the accessToken', async () => {
    const authentication = await (0, _decodeToken.default)('encoded-id');
    expect(authentication).toMatchObject({
      accessToken: 'external-access-token',
      userId: '1'
    });
  });
  it('reject invalid token', async () => {
    await (0, _assert.rejects)((0, _decodeToken.default)('invalid-id'), {
      status: 401
    });
  });
});