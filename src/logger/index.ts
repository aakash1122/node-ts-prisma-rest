import expressWinston from 'express-winston';
import winston from 'winston';
import 'winston-daily-rotate-file';

// const fileTransport = new winston.transports.File({ filename: 'error.log' });
const fileErrorTransport = new winston.transports.DailyRotateFile({
  filename: 'log/log-error-%DATE%.log',
  datePattern: 'yyyy-MM-DD-HH',
});

const errorLogger = () =>
  expressWinston.errorLogger({
    transports: [fileErrorTransport],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: 'this is a log {{req.method}}',
  });

const infoLogger = () =>
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  });

export { infoLogger, errorLogger };
