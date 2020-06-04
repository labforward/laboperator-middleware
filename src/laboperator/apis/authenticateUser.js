const _ = require('lodash');
const getAuthentications = require('./getAuthentications');
const { AuthorizationDeniedError } = require('../../errors');

module.exports = async (query = {}) => {
  if (!query.code) throw new AuthorizationDeniedError(query);

  const client = await require('../client');

  const response = await client.authentication.fetchToken({
    grantType: 'authorization_code',
    code: query.code,
  });

  const authentications = await getAuthentications(
    client.authenticateWith(response.accessToken)
  );

  client.authentication.update(authentications[0].userId, {
    ..._.reduce(
      authentications,
      (prev, authentication) => ({
        ...prev,
        [_.camelCase(authentication.provider)]: authentication,
      }),
      {}
    ),
    laboperator: response,
  });
};
