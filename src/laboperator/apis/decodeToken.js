const getAttributesFromResource = require('./getAttributesFromResource');

module.exports = async (id) => {
  const client = await require('../client');
  const response = await client.apis.authentications.getAuthentication(
    { id },
    client.authentication.authenticateAsUser()
  );

  return getAttributesFromResource(response.body);
};
