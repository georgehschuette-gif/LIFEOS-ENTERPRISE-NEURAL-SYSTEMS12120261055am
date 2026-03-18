import { AppLogger, getLogger } from '../config/logger';

export class LoggerService {
  private logger: AppLogger;

  constructor(namespace: string) {
    this.logger = getLogger(namespace);
  }

  fatal(message: string, meta?: Record<string, any>): void {
    this.logger.fatal(message, meta);
  }

  error(message: string, error?: Error | string, meta?: Record<string, any>): void {
    this.logger.error(message, error, meta);
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
    this.logger.trace(message, meta);
  }
}

export const getLoggerService = (namespace: string): LoggerService => {
  return new LoggerService(namespace);
};