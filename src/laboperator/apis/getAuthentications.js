const getAttributesFromResources = require('./getAttributesFromResources');

module.exports = async (options) => {
  const client = await require('../client');
  const response = await client.apis.authentications.getAuthentications(
    {},
    options
  );

  return getAttributesFromResources(response.body);
};
