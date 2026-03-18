import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';
import { config } from 'dotenv';

config();

const baseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env. DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER || 'postgres',
  password:  process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'lifeos',
  logging: process.env.NODE_ENV === 'development',
  entities: [path.join(__dirname, '../database/models/**/*.ts')],
  migrations: [path.join(__dirname, '../database/migrations/**/*.ts')],
  subscribers: [path. join(__dirname, '../database/subscribers/**/*.ts')],
  synchronize: false,
  poolSize: parseInt(process.env. DATABASE_POOL_SIZE || '10'),
  connectionTimeoutMillis: parseInt(process. env.DATABASE_TIMEOUT || '30000'),
  migrationsTableName: 'migrations',
  migrationsRun: true,
};

export const AppDataSource = new DataSource(baseConfig);

export const getDataSource = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource. initialize();
  }
  return AppDataSource;
};