"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const authentication1 = {
  id: '1',
  type: 'authentication',
  attributes: {
    access_token: 'external-access-token',
    created_at: Number(new Date()) / 1000,
    expires_in: 3600,
    provider: 'openid_connect',
    refresh_token: 'external-refresh-token',
    uid: 'test@example.com'
  },
  relationships: {
    user: {
      data: {
        id: '1',
        type: 'user'
      }
    }
  },
  links: {
    self: 'http://localhost:5000/api/v2/main/authentications/1'
  }
};
var _default = exports.default = [{
  endpoint: '/authentications',
  response: {
    data: [authentication1]
  }
}, {
  endpoint: '/authentications/encoded-id',
  response: {
    data: authentication1
  }
}, {
  endpoint: '/authentications/invalid-id',
  response: {
    body: {
      errors: [{
        detail: 'Authentication failed. The access token is invalid.',
        status: 401
      }]
    },
    status: 401
  }
}];