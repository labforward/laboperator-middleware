import getAttributesFromResource from './getAttributesFromResource';

export default async (id: string): Promise<Attributes> => {
  const client = await require('../client').default;
  const response = await client.apis.authentications.getAuthentication(
    { id },
    await client.authentication.authenticateAsUser()
  );

  return getAttributesFromResource(response.body);
};
