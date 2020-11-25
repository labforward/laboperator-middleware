import HttpStatus from 'http-status-codes';

interface JsonResponse<T> {
  status: string;
  code: string | number;
  details: T;
}

export default (
  code: string | number,
  details = HttpStatus.getStatusText(code)
): JsonResponse<typeof details> => ({
  status: HttpStatus.getStatusText(code),
  code,
  details,
});
