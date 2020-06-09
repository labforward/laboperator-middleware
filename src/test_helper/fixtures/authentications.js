const authentication1 = {
  id: '1',
  type: 'authentication',
  attributes: {
    provider: 'openid_connect',
    uid: 'test@example.com',
    access_token: 'external-access-token',
  },
  relationships: { user: { data: { id: '1', type: 'user' } } },
  links: {
    self: 'http://localhost:5000/api/v2/main/authentications/1',
  },
};

module.exports = [
  {
    endpoint: '/authentications',
    response: {
      data: [authentication1],
    },
  },
  {
    endpoint: '/authentications/encoded-id',
    response: {
      data: authentication1,
    },
  },
  {
    endpoint: '/authentications/invalid-id',
    response: {
      status: 401,
      body: {
        errors: [
          {
            status: 401,
            detail: 'Authentication failed. The access token is invalid.',
          },
        ],
      },
    },
  },
];
