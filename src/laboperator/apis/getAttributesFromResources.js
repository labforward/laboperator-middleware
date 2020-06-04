const getAttributesFromResource = require('./getAttributesFromResource');

module.exports = (raw) => {
  const resources = raw.data || raw;

  return resources.map(getAttributesFromResource);
};
