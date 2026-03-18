import winston from 'winston';
import path from 'path';
import { environment } from './environment';

const logLevels = {
  fatal: 0,
  error:  1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const createConsoleTransport = () => {
  return new winston.transports.Console({
    format: winston.format. combine(
      winston.format. timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format. errors({ stack: true }),
      environment.logging.format === 'json'
        ? winston.format.json()
        : winston.format. printf(({ timestamp, level, message, ... meta }) => {
            const metaStr = Object.keys(meta).length
              ? JSON.stringify(meta)
              : '';
            return `${timestamp} [${level. toUpperCase()}] ${message} ${metaStr}`;
          })
    ),
  });
};

const createFileTransport = (filename: string) => {
  return new winston.transports.File({
    filename: path.join(environment.logging.filePath, filename),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      winston.format.json()
    ),
  });
};

const transports:  winston.transport[] = [createConsoleTransport()];

if (environment.logging.toFile) {
  transports.push(createFileTransport('app.log'));
  transports.push(createFileTransport('error.log'));
}

export const logger = winston.createLogger({
  level: environment.logging.level,
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true })
  ),
  transports,
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(environment.logging.filePath, 'exceptions.log'),
    }),
  ],
});

// Create namespace logger
export const createLogger = (namespace: string) => {
  return logger.child({ namespace });
};