import camelCaseKeys from 'camelcase-keys';
import _ from 'lodash';

const getAttributesFromResource = (
  raw: ResourceData | Resource,
): Attributes => {
  const resource = (raw as ResourceData).data || (raw as Resource);
  const relationships = _.reduce(
    resource.relationships,
    (prev, value, key) => {
      const relationKey = Array.isArray(value.data) ? `${key}Ids` : `${key}Id`;
      const relationValue = Array.isArray(value.data)
        ? value.data.map((relation) => relation.id)
        : value.data.id;

      return {
        ...prev,
        [relationKey]: relationValue,
      };
    },
    {},
  );

  return {
    id: resource.id,
    type: resource.type,
    ...camelCaseKeys(resource.attributes, { deep: true }),
    ...relationships,
  };
};

export default getAttributesFromResource;
