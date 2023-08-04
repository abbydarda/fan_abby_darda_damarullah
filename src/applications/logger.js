const winston = require('winston');

const loggerOptions = {
 level: 'info',
 format: winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
   return `[${timestamp}] ${level}: ${JSON.stringify(message)}`;
  }),
 ),
 transports: [new winston.transports.Console()],
};

const logger = winston.createLogger(loggerOptions);

module.exports = logger;
