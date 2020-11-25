import { FetchErrorResponse } from 'swagger-client';

const getErrorMessageFromFetchError = (
  e: FetchErrorResponse
): string | undefined => {
  if (!e.response) return undefined;

  const { body } = e.response;
  const { errors: [error] = [] } = body || {};

  return (error && error.detail) || (body && body.error_description);
};
const getErrorMessageFromError = (e: Error) => e.message;

export default (e: Error | FetchErrorResponse): string => {
  return (
    getErrorMessageFromFetchError(e as FetchErrorResponse) ||
    getErrorMessageFromError(e as Error)
  );
};
