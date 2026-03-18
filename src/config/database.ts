import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';
import { environment } from './environment';
import { logger } from './logger';

/**
 * Database Configuration
 * TypeORM configuration for PostgreSQL
 */

const baseConfig: DataSourceOptions = {
  type: environment.database.type as any,
  host: environment.database.host,
  port: environment.database.port,
  username: environment.database.username,
  password: environment.database.password,
  database: environment.database.database,
  entities: [path.join(__dirname, '../database/models/**/*.ts')],
  migrations: [path.join(__dirname, '../database/migrations/**/*.ts')],
  subscribers: [path.join(__dirname, '../database/subscribers/**/*.ts')],
  synchronize: false, // Use migrations instead
  logging: environment.database.logging ?  ['query', 'error'] : false,
  poolSize: environment.database.poolSize,
  connectTimeoutMS: environment.database.timeout,
  maxQueryExecutionTime: 10000, // Log slow queries (>10s)
  migrationsTableName: 'migrations',
  migrationsRun: true,
};

/**
 * Create and initialize DataSource
 */
export const databaseConfig = new DataSource(baseConfig);

/**
 * Initialize database connection
 */
export const initializeDatabase = async (): Promise<DataSource> => {
  try {
    if (! databaseConfig.isInitialized) {
      await databaseConfig.initialize();
      logger.info('Database connection established', {
        host: environment.database.host,
        database: environment.database.database,
      });

      // Run migrations
      await databaseConfig.runMigrations();
      logger.info('Database migrations completed');
    }
    return databaseConfig;
  } catch (error) {
    logger.error('Failed to initialize database', error as Error);
    throw error;
  }
};

/**
 * Close database connection
 */
export const closeDatabase = async (): Promise<void> => {
  try {
    if (databaseConfig. isInitialized) {
      await databaseConfig.destroy();
      logger.info('Database connection closed');
    }
  } catch (error) {
    logger.error('Error closing database connection', error as Error);
    throw error;
  }
};

export default databaseConfig;