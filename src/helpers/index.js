const HttpStatus = require('http-status-codes');
const winston = require('winston');

const logger = winston.createLogger({
  exitOnError: false,
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(
          (info) => `${info.timestamp} [${info.level}] ${info.message}`
        )
      ),
    }),
  ],
});

module.exports = {
  logger,
  jsonResponse: (code, details = HttpStatus.getStatusText(code)) => ({
    status: HttpStatus.getStatusText(code),
    code,
    details,
  }),
};
