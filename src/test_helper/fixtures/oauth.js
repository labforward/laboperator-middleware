module.exports = [
  {
    endpoint: '/oauth/token',
    request: {
      grant_type: 'authorization_code',
      code: 'valid-code',
    },
    response: {
      access_token: 'laboperator-access-token',
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: 'laboperator-refresh-token',
      scope: 'read',
      created_at: Number(new Date()),
    },
  },
  {
    endpoint: '/oauth/token',
    request: {
      grant_type: 'authorization_code',
      code: 'invalid-code',
    },
    response: {
      status: 400,
      body: {
        error: 'invalid_grant',
        error_description:
          'The provided authorization grant is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.',
      },
    },
  },
  {
    endpoint: '/oauth/token',
    request: {
      grant_type: 'client_credentials',
    },
    response: {
      access_token: 'd4955a4d-c881-4f15-b1a7-ca98cace9618',
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: '123e5850-a3a7-45d0-95d5-5959717b855d',
      scope: 'read',
      created_at: Number(new Date()),
    },
  },
];
