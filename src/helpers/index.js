const HttpStatus = require('http-status-codes');

module.exports = {
  jsonResponse: (code, details = HttpStatus.getStatusText(code)) => ({
    status: HttpStatus.getStatusText(code),
    code,
    details,
  }),
};
