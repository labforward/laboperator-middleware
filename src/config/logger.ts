import winston from 'winston';

export { Logger } from 'winston';

const logFormatter = winston.format.printf((info) => {
  const { timestamp, level, response, stack, message } = info;

  if (response) {
    // http error
    const { status, statusText, body } = response;

    return `${timestamp} ${level}: ${status} ${statusText}
${timestamp} ${level}: ${JSON.stringify(body, undefined, 2)}
${timestamp} ${level}: ${stack}`;
  }

  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = winston.createLogger({
  exitOnError: false,
  level: 'debug',
  format: winston.format.errors({ stack: true }),
  transports: [
    process.env.NODE_ENV === 'test'
      ? new winston.transports.File({
          filename: 'log/test.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            logFormatter
          ),
        })
      : new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            logFormatter
          ),
        }),
  ],
});

export default logger;
