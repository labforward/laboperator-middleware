const HttpStatus = require('http-status-codes');

module.exports = (code, details = HttpStatus.getStatusText(code)) => ({
  status: HttpStatus.getStatusText(code),
  code,
  details,
});
