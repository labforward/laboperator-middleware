import getAttributesFromResource from './getAttributesFromResource';

export default (raw: ResourcesData | Resources): Array<Attributes> => {
  const resources = (raw as ResourcesData).data || (raw as Resources);

  return resources.map(getAttributesFromResource);
};
