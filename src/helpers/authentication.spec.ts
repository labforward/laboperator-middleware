import { rejects } from 'assert';

import sinon from 'sinon';

import factory from './authentication';

describe('Authentication', () => {
  it('re-resolve previously failing authentication', async () => {
    const clock = sinon.useFakeTimers();
    const authentication = factory('laboperator');
    const rejection = Promise.reject('spy');
    const stub = sinon
      .stub(authentication, 'fetchToken')
      .callsFake(() => rejection);

    // fake refresh token failure due to e.g. network failure
    clock.restore();
    await rejects(authentication.get('1'));

    stub.restore();

    expect(await authentication.get('1')).to.eql('fresh-access-token');
  });
});
