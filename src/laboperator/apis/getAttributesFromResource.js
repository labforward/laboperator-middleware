const camelCaseKeys = require('camelcase-keys');
const _ = require('lodash');

const getAttributesFromResource = (raw) => {
  const resource = raw.data || raw;
  const relationships = _.reduce(
    resource.relationships,
    (prev, value, key) => {
      const relationKey = Array.isArray(value) ? `${key}Ids` : `${key}Id`;
      const relationValue = Array.isArray(value)
        ? value.data.map((relation) => relation.id)
        : value.data.id;

      return {
        ...prev,
        [relationKey]: relationValue,
      };
    },
    {}
  );

  return {
    ..._.pick(resource, ['id', 'type']),
    ...camelCaseKeys(resource.attributes, { deep: true }),
    ...relationships,
  };
};

module.exports = getAttributesFromResource;
