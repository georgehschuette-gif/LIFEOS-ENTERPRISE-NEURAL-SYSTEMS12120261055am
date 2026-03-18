import { BaseEntity } from './index';

export interface ApiRequest extends BaseEntity {
  method:  string;
  path: string;
  timestamp: Date;
  userId?:  string;
  ipAddress:  string;
  userAgent: string;
  duration: number;
  statusCode: number;
  error?: string;
  responseSize: number;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType:  'Bearer';
}

export interface User extends BaseEntity {
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  active: boolean;
  lastLoginAt?: Date;
  passwordHash:  string;
}

export type UserRole = 'admin' | 'operator' | 'viewer' | 'api';

export type Permission =
  | 'system:read'
  | 'system:write'
  | 'recovery:execute'
  | 'recovery: read'
  | 'health:read'
  | 'anomaly:read'
  | 'optimization:read'
  | 'optimization:execute'
  | 'admin:full'
  | 'settings:write';

export interface RequestValidationError {
  field: string;
  message: string;
  value?:  any;
}

export interface MetricsSnapshot extends BaseEntity {
  timestamp: Date;
  systemHealth: number;
  activeAnomalies: number;
  pendingRecoveries: number;
  componentCount: number;
  healthyComponents: number;
  degradedComponents: number;
  failedComponents: number;
  averageLatency: number;
  errorRate: number;
}

export interface AuditLog extends BaseEntity {
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  changes?:  Record<string, any>;
  ipAddress: string;
  userAgent: string;
}