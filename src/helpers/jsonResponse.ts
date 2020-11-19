import HttpStatus from 'http-status-codes';

export default (code, details = HttpStatus.getStatusText(code)) => ({
  status: HttpStatus.getStatusText(code),
  code,
  details,
});
