import getAttributesFromResource from './getAttributesFromResource';

export default (raw) => {
  const resources = raw.data || raw;

  return resources.map(getAttributesFromResource);
};
