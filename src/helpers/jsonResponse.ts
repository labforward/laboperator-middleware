import HttpStatus from 'http-status-codes';

interface JsonResponse<T> {
  code: string | number;
  details: T;
  status: string;
}

export default (
  code: string | number,
  details = HttpStatus.getStatusText(code)
): JsonResponse<typeof details> => ({
  code,
  details,
  status: HttpStatus.getStatusText(code),
});
