"use strict";

var _ = _interopRequireDefault(require("."));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('config', () => {
  it('includes configuration for all providers', async () => {
    expect(_.default.providers).toMatchObject({
      laboperator: {
        url: {
          protocol: 'http:',
          host: 'localhost:5000',
          port: '5000',
          hostname: 'localhost',
          pathname: '/api/v2/main',
          path: '/api/v2/main',
          href: 'http://localhost:5000/api/v2/main',
          origin: 'http://localhost:5000'
        }
      },
      example: {
        url: {
          protocol: 'http:',
          host: 'example.com',
          hostname: 'example.com',
          pathname: '/api',
          path: '/api?foo',
          href: 'http://example.com/api?foo',
          origin: 'http://example.com'
        }
      }
    });
  });
});