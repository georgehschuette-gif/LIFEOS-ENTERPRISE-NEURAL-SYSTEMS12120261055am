/**
 * Application Constants
 * Centralized constant definitions used throughout the application
 */

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Recovery Types
export const RECOVERY_TYPES = {
  RESTART:  'restart',
  SCALE:  'scale',
  ROLLBACK: 'rollback',
  REPLACE: 'replace',
  ISOLATE: 'isolate',
  OPTIMIZE: 'optimize',
  CIRCUIT_BREAK: 'circuit_break',
  THROTTLE: 'throttle',
} as const;

// Recovery Status
export const RECOVERY_STATUS = {
  PENDING: 'pending',
  EXECUTING: 'executing',
  SUCCESS: 'success',
  PARTIAL:  'partial',
  FAILED: 'failed',
  ROLLED_BACK: 'rolled_back',
  CANCELLED: 'cancelled',
} as const;

// Component Status
export const COMPONENT_STATUS = {
  HEALTHY: 'healthy',
  DEGRADED: 'degraded',
  UNHEALTHY: 'unhealthy',
  FAILED: 'failed',
  UNKNOWN: 'unknown',
} as const;

// Anomaly Types
export const ANOMALY_TYPES = {
  PERFORMANCE: 'performance',
  SECURITY: 'security',
  AVAILABILITY: 'availability',
  DATA:  'data',
  MODEL: 'model',
  RESOURCE: 'resource',
  DEPENDENCY: 'dependency',
} as const;

// Anomaly Severity
export const ANOMALY_SEVERITY = {
  LOW:  'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

// Component Types
export const COMPONENT_TYPES = {
  SERVICE: 'service',
  DATABASE: 'database',
  NETWORK: 'network',
  STORAGE: 'storage',
  AI_MODEL: 'ai_model',
  CACHE: 'cache',
  QUEUE: 'queue',
} as const;

// Optimization Status
export const OPTIMIZATION_STATUS = {
  IDENTIFIED: 'identified',
  PLANNED: 'planned',
  EXECUTING: 'executing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  SKIPPED: 'skipped',
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN:  'admin',
  OPERATOR: 'operator',
  VIEWER: 'viewer',
  API:  'api',
} as const;

// Permissions
export const PERMISSIONS = {
  SYSTEM_READ: 'system:read',
  SYSTEM_WRITE: 'system:write',
  RECOVERY_EXECUTE: 'recovery:execute',
  RECOVERY_READ: 'recovery:read',
  HEALTH_READ: 'health:read',
  ANOMALY_READ: 'anomaly:read',
  OPTIMIZATION_READ: 'optimization:read',
  OPTIMIZATION_EXECUTE: 'optimization:execute',
  ADMIN_FULL: 'admin:full',
  SETTINGS_WRITE: 'settings: write',
} as const;

// Cache Keys
export const CACHE_KEYS = {
  SYSTEM_STATE: 'lifeos:system:state',
  COMPONENT_HEALTH: 'lifeos:component:health: ',
  ANOMALIES: 'lifeos:anomalies:',
  RECOVERY_HISTORY: 'lifeos:recovery: history:',
  HEALTH_METRICS: 'lifeos:health:metrics:',
  ML_MODEL_CACHE: 'lifeos:ml: models:',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'An internal server error occurred',
  INVALID_REQUEST: 'Invalid request parameters',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  NOT_FOUND: 'Resource not found',
  CONFLICT: 'Resource conflict',
  SERVICE_UNAVAILABLE: 'Service temporarily unavailable',
  DATABASE_ERROR: 'Database error occurred',
  VALIDATION_ERROR:  'Validation error',
  RECOVERY_FAILED: 'Recovery action failed',
  ML_MODEL_ERROR: 'ML model error',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  OPERATION_SUCCESSFUL: 'Operation completed successfully',
  RECOVERY_STARTED: 'Recovery action initiated',
  HEALTH_CHECK_PASSED: 'Health check passed',
  DATA_RETRIEVED: 'Data retrieved successfully',
} as const;

// Time Intervals (in milliseconds)
export const TIME_INTERVALS = {
  SECOND:  1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
} as const;

// ML Model Names
export const ML_MODELS = {
  ANOMALY_DETECTION: 'anomaly_detection',
  RECOVERY_PLANNING: 'recovery_planning',
  OPTIMIZATION:  'optimization',
} as const;

// Event Names
export const EVENTS = {
  ENGINE_STARTED: 'engine: started',
  ENGINE_STOPPED: 'engine:stopped',
  HEALTH_CHECK_COMPLETED: 'health: check:completed',
  ANOMALY_DETECTED: 'anomaly:detected',
  ANOMALY_RESOLVED: 'anomaly:resolved',
  RECOVERY_STARTED: 'recovery:started',
  RECOVERY_COMPLETED: 'recovery:completed',
  RECOVERY_FAILED: 'recovery:failed',
  OPTIMIZATION_IDENTIFIED: 'optimization:identified',
  OPTIMIZATION_EXECUTED: 'optimization:executed',
  STATE_UPDATED: 'state:updated',
  ERROR_OCCURRED: 'error: occurred',
} as const;

// Default Timeouts (in milliseconds)
export const TIMEOUTS = {
  HEALTH_CHECK: 5000,
  RECOVERY_ACTION: 30000,
  ML_INFERENCE: 10000,
  API_REQUEST: 30000,
  DATABASE_QUERY: 10000,
} as const;

// Thresholds
export const THRESHOLDS = {
  CRITICAL_HEALTH: 30,
  WARNING_HEALTH: 60,
  HEALTHY:  85,
  MIN_CONFIDENCE: 0.7,
  HIGH_ERROR_RATE: 0.1,
  CRITICAL_ERROR_RATE: 0.3,
  MAX_LATENCY: 1000,
  CRITICAL_LATENCY: 5000,
} as const;

export default {
  HTTP_STATUS,
  RECOVERY_TYPES,
  RECOVERY_STATUS,
  COMPONENT_STATUS,
  ANOMALY_TYPES,
  ANOMALY_SEVERITY,
  COMPONENT_TYPES,
  OPTIMIZATION_STATUS,
  USER_ROLES,
  PERMISSIONS,
  CACHE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  TIME_INTERVALS,
  ML_MODELS,
  EVENTS,
  TIMEOUTS,
  THRESHOLDS,
};