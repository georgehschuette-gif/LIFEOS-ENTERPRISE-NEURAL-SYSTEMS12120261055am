import { DataSource } from 'typeorm';
import { getLoggerService } from '../utils/logger';
import { environment } from '../config/environment';
import path from 'path';

const logger = getLoggerService('Database');

/**
 * Database Connection Manager
 */
export class DatabaseConnection {
  private static instance:  DataSource | null = null;

  static async initialize(): Promise<DataSource> {
    if (this.instance && this.instance.isInitialized) {
      return this.instance;
    }

    try {
      this.instance = new DataSource({
        type: 'postgres',
        host: environment.database.host,
        port: environment.database.port,
        username: environment.database.username,
        password: environment.database.password,
        database: environment.database.database,
        entities: [path.join(__dirname, './models/**/*.ts')],
        migrations: [path.join(__dirname, './migrations/**/*.ts')],
        synchronize: false,
        logging: environment.database.logging,
        poolSize: environment.database.poolSize,
        connectTimeoutMS: environment.database.timeout,
        maxQueryExecutionTime: 10000,
      });

      await this.instance.initialize();
      logger.info('Database connected successfully');

      // Run migrations
      if (this.instance.migrations. length > 0) {
        await this.instance.runMigrations();
        logger.info('Database migrations completed');
      }

      return this.instance;
    } catch (error) {
      logger.error('Failed to initialize database', error as Error);
      throw error;
    }
  }

  static async close(): Promise<void> {
    if (this.instance && this. instance.isInitialized) {
      await this.instance.destroy();
      this.instance = null;
      logger.info('Database connection closed');
    }
  }

  static getInstance(): DataSource | null {
    return this.instance;
  }
}

export default DatabaseConnection;