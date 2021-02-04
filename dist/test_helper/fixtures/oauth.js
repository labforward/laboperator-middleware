"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  endpoint: '/oauth/token',
  method: 'post',
  request: {
    grant_type: 'authorization_code',
    code: 'valid-code'
  },
  response: {
    access_token: 'laboperator-access-token',
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token: 'laboperator-refresh-token',
    scope: 'read',
    created_at: Number(new Date()) / 1000
  }
}, {
  endpoint: '/oauth/token',
  method: 'post',
  request: {
    grant_type: 'refresh_token',
    refresh_token: 'laboperator-refresh-token'
  },
  response: {
    access_token: 'fresh-access-token',
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token: 'laboperator-refresh-token',
    scope: 'read',
    created_at: Number(new Date()) / 1000
  }
}, {
  endpoint: '/oauth/token',
  method: 'post',
  request: {
    grant_type: 'authorization_code',
    code: 'invalid-code'
  },
  response: {
    status: 400,
    body: {
      error: 'invalid_grant',
      error_description: 'The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.'
    }
  }
}, {
  endpoint: '/oauth/token',
  method: 'post',
  request: {
    grant_type: 'client_credentials'
  },
  response: {
    access_token: 'd4955a4d-c881-4f15-b1a7-ca98cace9618',
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token: '123e5850-a3a7-45d0-95d5-5959717b855d',
    scope: 'read',
    created_at: Number(new Date()) / 1000
  }
}, {
  endpoint: '/oauth/token/info?access_token=laboperator-access-token',
  response: {
    resource_owner_id: 1,
    scope: ['read'],
    expires_in: 3600,
    application: {
      uid: '19f4762b-c9f0-47a4-be67-de3b32ff5954'
    }
  }
}];
exports.default = _default;