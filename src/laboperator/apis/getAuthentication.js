const getAttributesFromResource = require('./getAttributesFromResource');

module.exports = async (id, options) => {
  const client = await require('../client');
  const response = await client.apis.authentications.getAuthentication(
    { id },
    options
  );

  return getAttributesFromResource(response.body);
};
