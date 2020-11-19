const getAttributesFromResource = require('./getAttributesFromResource');

module.exports = async (id) => {
  const client = await require('../client');
  const response = await client.apis.authentications.getAuthentication(
    { id },
    await client.authentication.authenticateAsUser()
  );

  return getAttributesFromResource(response.body);
};
