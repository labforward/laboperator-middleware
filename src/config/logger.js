const winston = require('winston');

const logger = winston.createLogger({
  exitOnError: false,
  level: 'debug',
  transports: [
    process.env.NODE_ENV === 'test'
      ? new winston.transports.File({
          filename: 'log/test.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(
              (info) => `${info.timestamp} [${info.level}] ${info.message}`
            )
          ),
          silent: true,
        })
      : new winston.transports.Console({
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

logger.stream = {
  write: (message, _encoding) => logger.info(message),
};

module.exports = logger;
