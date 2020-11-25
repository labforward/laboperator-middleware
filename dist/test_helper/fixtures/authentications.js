"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const authentication1 = {
  id: '1',
  type: 'authentication',
  attributes: {
    provider: 'openid_connect',
    uid: 'test@example.com',
    access_token: 'external-access-token',
    expires_in: 3600,
    refresh_token: 'external-refresh-token',
    created_at: Number(new Date()) / 1000
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
var _default = [{
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
    status: 401,
    body: {
      errors: [{
        status: 401,
        detail: 'Authentication failed. The access token is invalid.'
      }]
    }
  }
}];
exports.default = _default;