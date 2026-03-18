import { config as dotenv } from 'dotenv';
import { join } from 'path';

// Load environment variables from .env files
dotenv({ path: join(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`) });
dotenv({ path: join(process.cwd(), '.env') });

// Detect test mode
const isTest = process.env.NODE_ENV === 'test';

// Helpers
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue && !isTest) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || defaultValue || '';
};

const getEnvNumber = (key: string, defaultValue?: number): number => {
  const value = process.env[key];
  if (!value && defaultValue === undefined && !isTest) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value ? parseInt(value, 10) : defaultValue || 0;
};

const getEnvBoolean = (key: string, defaultValue = false): boolean => {
  const value = process.env[key];
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
};

// Main environment object
export const environment = {
  // Application
  nodeEnv: (process.env.NODE_ENV || 'development') as 'development' | 'staging' | 'production' | 'test',
  appName: getEnvVar('APP_NAME', 'LifeOS'),
  appVersion: getEnvVar('APP_VERSION', '1.0.0'),
  port: getEnvNumber('PORT', 3000),
  host: getEnvVar('HOST', '0.0.0.0'),

  // Logging
  logging: {
    level: getEnvVar('LOG_LEVEL', 'info'),
    format: getEnvVar('LOG_FORMAT', 'json'),
    toFile: getEnvBoolean('LOG_TO_FILE', false),
    filePath: getEnvVar('LOG_FILE_PATH', './logs'),
  },

  // Database
  database: {
    type: getEnvVar('DATABASE_TYPE', 'postgres') as 'postgres' | 'mysql' | 'sqlite',
    host: isTest ? 'localhost' : getEnvVar('DATABASE_HOST', 'localhost'),
    port: isTest ? 5432 : getEnvNumber('DATABASE_PORT', 5432),
    username: isTest ? 'test' : getEnvVar('DATABASE_USER', 'postgres'),
    password: isTest ? 'test' : getEnvVar('DATABASE_PASSWORD', 'password'),
    database: isTest ? 'lifeos_test' : getEnvVar('DATABASE_NAME', 'lifeos'),
    poolSize: getEnvNumber('DATABASE_POOL_SIZE', 10),
    timeout: getEnvNumber('DATABASE_TIMEOUT', 30000),
    logging: getEnvBoolean('DATABASE_LOGGING', false),
  },

  // Redis
  redis: {
    host: isTest ? 'localhost' : getEnvVar('REDIS_HOST', 'localhost'),
    port: isTest ? 6379 : getEnvNumber('REDIS_PORT', 6379),
    password: isTest ? undefined : process.env.REDIS_PASSWORD,
    db: getEnvNumber('REDIS_DB', 0),
    ttl: getEnvNumber('REDIS_TTL', 3600),
  },

  // API
  api: {
    prefix: getEnvVar('API_PREFIX', '/api/v1'),
    corsOrigin: getEnvVar('CORS_ORIGIN', '*'),
    corsCredentials: getEnvBoolean('CORS_CREDENTIALS', true),
    rateLimitWindowMs: getEnvNumber('RATE_LIMIT_WINDOW_MS', 900000),
    rateLimitMaxRequests: getEnvNumber('RATE_LIMIT_MAX_REQUESTS', 100),
  },

  // JWT
  jwt: {
    secret: isTest ? 'test-secret' : getEnvVar('JWT_SECRET', 'your_jwt_secret_key_change_this'),
    expiry: getEnvVar('JWT_EXPIRY', '24h'),
    refreshSecret: isTest ? 'test-refresh' : getEnvVar('JWT_REFRESH_SECRET', 'your_refresh_token_secret'),
    refreshExpiry: getEnvVar('JWT_REFRESH_EXPIRY', '7d'),
  },

  // ML Models
  ml: {
    modelsPath: isTest ? './models/test' : getEnvVar('ML_MODELS_PATH', './models'),
    batchSize: getEnvNumber('ML_BATCH_SIZE', 32),
    confidenceThreshold: parseFloat(getEnvVar('ML_CONFIDENCE_THRESHOLD', '0.7')),
    timeout: getEnvNumber('ML_MODEL_TIMEOUT', 30000),
  },

  // Monitoring
  monitoring: {
    enablePrometheus: getEnvBoolean('ENABLE_PROMETHEUS', true),
    enableJaeger: getEnvBoolean('ENABLE_JAEGER', false),
    jaegerHost: getEnvVar('JAEGER_AGENT_HOST', 'localhost'),
    jaegerPort: getEnvNumber('JAEGER_AGENT_PORT', 6831),
  },

  // Health Checks
  healthChecks: {
    interval: getEnvNumber('HEALTH_CHECK_INTERVAL', 30000),
    timeout: getEnvNumber('HEALTH_CHECK_TIMEOUT', 5000),
    retries: getEnvNumber('HEALTH_CHECK_RETRIES', 3),
  },

  // Recovery
  recovery: {
    threshold: getEnvNumber('RECOVERY_THRESHOLD', 70),
    optimizationThreshold: getEnvNumber('OPTIMIZATION_THRESHOLD', 85),
    maxConcurrent: getEnvNumber('MAX_CONCURRENT_RECOVERIES', 5),
    autoRecoveryEnabled: getEnvBoolean('ENABLE_AUTO_RECOVERY', true),
    autoOptimizationEnabled: getEnvBoolean('ENABLE_AUTO_OPTIMIZATION', true),
  },

  // Email
  email: {
    enabled: getEnvBoolean('EMAIL_ENABLED', false),
    from: getEnvVar('EMAIL_FROM', 'noreply@lifeos.com'),
    smtp: {
      host: isTest ? 'localhost' : getEnvVar('SMTP_HOST', 'smtp.gmail.com'),
      port: isTest ? 1025 : getEnvNumber('SMTP_PORT', 587),
      user: isTest ? 'test' : getEnvVar('SMTP_USER', ''),
      password: isTest ? 'test' : getEnvVar('SMTP_PASSWORD', ''),
    },
  },

  // Slack
  slack: {
    enabled: getEnvBoolean('SLACK_ENABLED', false),
    webhookUrl: getEnvVar('SLACK_WEBHOOK_URL', ''),
  },

  // Sentry
  sentry: {
    enabled: getEnvBoolean('SENTRY_ENABLED', false),
    dsn: getEnvVar('SENTRY_DSN', ''),
  },

  // Python ML Service
  pythonService: {
    url: isTest ? 'http://localhost:5001/test' : getEnvVar('PYTHON_SERVICE_URL', 'http://localhost:5001'),
    timeout: getEnvNumber('PYTHON_SERVICE_TIMEOUT', 30000),
  },

  // Security
  security: {
    encryptionKey: isTest ? 'test_encryption_key_32_chars_long!!' : getEnvVar('ENCRYPTION_KEY', 'change_me_in_production_32_character_key'),
    enableHttps: getEnvBoolean('ENABLE_HTTPS', false),
    sslCertPath: process.env.SSL_CERT_PATH,
    sslKeyPath: process.env.SSL_KEY_PATH,
  },

  // Persistence
  persistence: {
    enabled: getEnvBoolean('PERSISTENCE_ENABLED', true),
    interval: getEnvNumber('PERSISTENCE_INTERVAL', 300000),
  },

  // Feature Flags
  features: {
    autoRecovery: getEnvBoolean('FEATURE_AUTO_RECOVERY', true),
    optimization: getEnvBoolean('FEATURE_OPTIMIZATION', true),
    learning: getEnvBoolean('FEATURE_LEARNING', true),
    reporting: getEnvBoolean('FEATURE_REPORTING', true),
    advancedAnalytics: getEnvBoolean('FEATURE_ADVANCED_ANALYTICS', false),
  },
};

// Type exports for strict typing
export type Environment = typeof environment;

// Environment flags
export const isProduction = environment.nodeEnv === 'production';
export const isStaging = environment.nodeEnv === 'staging';
export const isDevelopment = environment.nodeEnv === 'development';

// Export the already-defined isTest
export { isTest };