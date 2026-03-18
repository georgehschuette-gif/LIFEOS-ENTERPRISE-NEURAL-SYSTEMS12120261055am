import winston, { Logger as WinstonLogger } from 'winston';
import path from 'path';
import { environment } from './environment';
import fs from 'fs';

// Ensure logs directory exists
const logsDir = environment.logging.filePath;
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  environment.logging.format === 'json'
    ? winston.format.json()
    : winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
        return `${timestamp} [${level.toUpperCase()}] ${message} ${metaStr}`;
      })
);

// Console transport
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    logFormat
  ),
});

// File transports
const transports: winston.transport[] = [consoleTransport];

if (environment.logging.toFile) {
  transports.push(
    new winston.transports.File({
      filename: path.join(logsDir, 'app.log'),
      maxsize: 5242880,
      maxFiles: 5,
      format: logFormat,
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880,
      maxFiles: 5,
      format: logFormat,
    })
  );
}

// Main logger instance
export const logger: WinstonLogger = winston.createLogger({
  level: environment.logging.level,
  format: logFormat,
  transports,
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'exceptions.log'),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'rejections.log'),
    }),
  ],
  exitOnError: false,
});

// Create a child logger with namespace
export const createLogger = (namespace: string): WinstonLogger => {
  return logger.child({ namespace });
};

// Wrapper class with consistent API
export class AppLogger {
  private logger: WinstonLogger;

  constructor(namespace: string) {
    this.logger = createLogger(namespace);
  }

  fatal(message: string, meta?: Record<string, any>): void {
    this.logger.error(message, { level: 'fatal', ...meta });
  }

  error(message: string, error?: Error | string, meta?: Record<string, any>): void {
    const errorObj =
      error instanceof Error
        ? { errorName: error.name, errorMessage: error.message, stack: error.stack }
        : { error };
    this.logger.error(message, { ...errorObj, ...meta });
  }

  warn(message: string, meta?: Record<string, any>): void {
    this.logger.warn(message, meta);
  }

  info(message: string, meta?: Record<string, any>): void {
    this.logger.info(message, meta);
  }

  debug(message: string, meta?: Record<string, any>): void {
    this.logger.debug(message, meta);
  }

  trace(message: string, meta?: Record<string, any>): void {
    this.logger.debug(message, { ...meta, level: 'trace' });
  }

  child(metadata: Record<string, any>): WinstonLogger {
    return this.logger.child(metadata);
  }
}

export const getLogger = (namespace: string): AppLogger => {
  return new AppLogger(namespace);
};

export default logger;