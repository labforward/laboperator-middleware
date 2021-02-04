"use strict";

var _assert = require("assert");

var _sinon = _interopRequireDefault(require("sinon"));

var _authentication = _interopRequireDefault(require("./authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Authentication', () => {
  it('re-resolve previously failing authentication', async () => {
    const clock = _sinon.default.useFakeTimers();

    const authentication = (0, _authentication.default)('laboperator');
    const rejection = Promise.reject('spy');

    const stub = _sinon.default.stub(authentication, 'fetchToken').callsFake(() => rejection); // fake refresh token failure due to e.g. network failure


    clock.restore();
    await (0, _assert.rejects)(authentication.get('1'));
    stub.restore();
    expect(await authentication.get('1')).to.eql('fresh-access-token');
  });
});