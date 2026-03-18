import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables
config({ path: join(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`) });
config({ path: join(process.cwd(), '.env') });

export const environment = {
  // Application
  nodeEnv: process.env.NODE_ENV || 'development',
  appName: process.env.APP_NAME || 'LifeOS',
  appVersion: process.env.APP_VERSION || '1.0.0',
  port: parseInt(process.env.PORT || '3000'),
  host: process.env.HOST || '0.0.0.0',

  // Logging
  logging: {
    level: process. env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'json',
    toFile: process.env.LOG_TO_FILE === 'true',
    filePath: process.env.LOG_FILE_PATH || './logs',
  },

  // Database
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'lifeos',
    poolSize: parseInt(process.env. DATABASE_POOL_SIZE || '10'),
    timeout: parseInt(process.env.DATABASE_TIMEOUT || '30000'),
  },

  // Redis
  redis: {
    host:  process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env. REDIS_PORT || '6379'),
    password: process.env. REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB || '0'),
    ttl: parseInt(process.env. REDIS_TTL || '3600'),
  },

  // API
  api: {
    prefix: process.env.API_PREFIX || '/api/v1',
    corsOrigin: process.env.CORS_ORIGIN || '*',
    rateLimitWindow: parseInt(process.env. RATE_LIMIT_WINDOW || '15'),
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key_change_this',
    expiry: process.env.JWT_EXPIRY || '24h',
  },

  // ML Models
  ml: {
    modelsPath: process.env.ML_MODELS_PATH || './models',
    batchSize: parseInt(process.env.ML_BATCH_SIZE || '32'),
    confidenceThreshold: parseFloat(process.env.ML_CONFIDENCE_THRESHOLD || '0.7'),
  },

  // Monitoring
  monitoring: {
    enablePrometheus: process.env. ENABLE_PROMETHEUS === 'true',
    enableJaeger:  process.env.ENABLE_JAEGER === 'true',
    jaegerHost: process.env.JAEGER_AGENT_HOST || 'localhost',
    jaegerPort: parseInt(process. env.JAEGER_AGENT_PORT || '6831'),
  },

  // Health Checks
  healthChecks: {
    interval: parseInt(process.env.HEALTH_CHECK_INTERVAL || '30000'),
    timeout: parseInt(process.env. HEALTH_CHECK_TIMEOUT || '5000'),
    retries: parseInt(process.env.HEALTH_CHECK_RETRIES || '3'),
  },

  // Recovery
  recovery: {
    threshold: parseInt(process.env. RECOVERY_THRESHOLD || '70'),
    optimizationThreshold: parseInt(process.env.OPTIMIZATION_THRESHOLD || '85'),
    maxConcurrent: parseInt(process.env.MAX_CONCURRENT_RECOVERIES || '5'),
  },

  // Security
  security: {
    encryptionKey: process.env. ENCRYPTION_KEY || 'change_me_in_production',
    enableHttps: process.env.ENABLE_HTTPS === 'true',
    sslCertPath: process.env.SSL_CERT_PATH,
    sslKeyPath: process.env. SSL_KEY_PATH,
  },

  // Feature Flags
  features: {
    autoRecovery: process. env.FEATURE_AUTO_RECOVERY !== 'false',
    optimization: process.env.FEATURE_OPTIMIZATION !== 'false',
    learning: process.env. FEATURE_LEARNING !== 'false',
    reporting: process.env.FEATURE_REPORTING !== 'false',
  },

  // Persistence
  persistence: {
    enabled: process.env.PERSISTENCE_ENABLED === 'true',
    interval: parseInt(process. env.PERSISTENCE_INTERVAL || '300000'),
  },
};

export const isDevelopment = environment.nodeEnv === 'development';
export const isProduction = environment.nodeEnv === 'production';
export const isTest = environment.nodeEnv === 'test';