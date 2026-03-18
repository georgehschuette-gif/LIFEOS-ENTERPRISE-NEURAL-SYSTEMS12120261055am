import 'express-async-errors';
import { createServer } from './server';
import { getLoggerService } from './utils/logger';
import { validateConfig } from './config';

const logger = getLoggerService('Main');

/**
 * Application Entry Point
 */
async function main(): Promise<void> {
  try {
    logger.info('LifeOS Neural Platform - Starting');

    // Validate configuration
    validateConfig();

    // Create and start server
    const server = await createServer();

    // Graceful shutdown handlers
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received, shutting down gracefully');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      logger.info('SIGINT received, shutting down gracefully');
      server.close(() => {
        logger. info('Server closed');
        process.exit(0);
      });
    });

    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', promise as any, reason as any);
    });

    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error as Error);
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start application', error as Error);
    process.exit(1);
  }
}

main();