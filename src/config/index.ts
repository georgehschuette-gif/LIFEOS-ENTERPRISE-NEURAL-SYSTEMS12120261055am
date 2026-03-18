import { environment } from './environment';
import { logger } from './logger';
import { databaseConfig } from './database';
import { redisConfig } from './redis';

/**
 * Central configuration export
 * All application configuration accessible from single point
 */

export const config = {
  environment,
  logger,
  database: databaseConfig,
  redis: redisConfig,
  
  // App metadata
  app: {
    name: environment.appName,
    version: environment.appVersion,
    environment:  environment.nodeEnv,
  },

  // API configuration
  api: {
    prefix: environment.api.prefix,
    port: environment.port,
    host: environment.host,
    timeout: 30000,
  },

  // Feature flags
  features: environment.features,

  // Recovery settings
  recovery: {
    threshold: environment.recovery.threshold,
    optimizationThreshold: environment.recovery.optimizationThreshold,
    maxConcurrent: environment.recovery.maxConcurrent,
  },

  // Health check settings
  healthChecks: {
    interval: environment.healthChecks.interval,
    timeout: environment.healthChecks.timeout,
    retries: environment.healthChecks. retries,
  },

  // ML settings
  ml: {
    modelsPath: environment.ml.modelsPath,
    batchSize: environment.ml.batchSize,
    confidenceThreshold: environment.ml. confidenceThreshold,
  },

  // Monitoring
  monitoring: {
    enablePrometheus: environment.monitoring.enablePrometheus,
    enableJaeger: environment.monitoring.enableJaeger,
  },

  // Persistence
  persistence: {
    enabled: environment.persistence.enabled,
    interval: environment.persistence.interval,
  },
};

export type Config = typeof config;

// Validate configuration on startup
export const validateConfig = (): void => {
  const requiredKeys = [
    'DATABASE_HOST',
    'DATABASE_NAME',
    'JWT_SECRET',
  ];

  const missing = requiredKeys.filter(key => !process.env[key]);

  if (missing.length > 0) {
    logger.warn(`Missing environment variables: ${missing.join(', ')}`);
  }

  logger.info('Configuration loaded successfully', {
    environment: environment.nodeEnv,
    apiPrefix: environment.api.prefix,
  });
};