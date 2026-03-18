import { BaseEntity } from './index';

/* -------------------------------------------------------
 * COMPONENT HEALTH
 * -----------------------------------------------------*/

export interface ComponentHealth extends BaseEntity {
  name: string;
  type: ComponentType;
  status: ComponentStatus;
  metrics: ComponentMetrics;
  dependencies: string[];
  lastCheck: Date;
  lastHealthyAt?: Date;
  failureProbability: number;
  recoveryTimeEstimate: number;
  checkHistory: HealthCheckRecord[];
  metadata: Record<string, any>;
}

export type ComponentType =
  | 'service'
  | 'database'
  | 'network'
  | 'storage'
  | 'ai_model'
  | 'cache'
  | 'queue';

export type ComponentStatus =
  | 'healthy'
  | 'degraded'
  | 'unhealthy'
  | 'failed'
  | 'unknown';

export interface ComponentMetrics {
  latency: number;
  throughput: number;
  errorRate: number;
  resourceUsage?: ResourceUsage;
  availability?: number;
  uptime?: number;
  lastResponse?: number;
}

export interface ResourceUsage {
  cpu: number;
  memory: number;
  disk?: number;
  network?: number;
}

/* -------------------------------------------------------
 * SYSTEM METRICS
 * -----------------------------------------------------*/

export interface SystemMetrics {
  latency: number;
  throughput: number;
  errorRate: number;
  resourceUtilization: ResourceUtilization;
  availability: number;
  reliability: number;
  securityScore: number;
  lastUpdated: Date;
}

export interface ResourceUtilization {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

/* -------------------------------------------------------
 * HEALTH CHECK RECORD
 * -----------------------------------------------------*/

export interface HealthCheckRecord {
  timestamp: Date;
  status: ComponentStatus;
  latency: number;
  errorRate: number;
  details?: Record<string, any>;
}

/* -------------------------------------------------------
 * SERVICE HEALTH TYPES (from your old file)
 * -----------------------------------------------------*/

export interface HealthThresholds {
  latencyWarning: number;
  latencyCritical: number;
  errorRateWarning: number;
  errorRateCritical: number;
  availabilityWarning: number;
  responseTimeMax?: number;
}

export interface ServiceCredentials {
  type: 'basic' | 'bearer' | 'api_key' | 'custom';
  username?: string;
  password?: string;
  token?: string;
  apiKey?: string;
  headers?: Record<string, string>;
}

export interface ServiceConfig extends BaseEntity {
  name: string;
  type: ComponentType;
  endpoint: string;
  healthCheckPath: string;
  timeout: number;
  retries: number;
  interval: number;
  thresholds: HealthThresholds;
  enabled: boolean;
  credentials?: ServiceCredentials;
}

export interface ServiceHealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy' | 'failed';
  latency: number;
  timestamp: Date;
  details: Record<string, any>;
  error?: string;
}

export interface HealthCheckMetrics {
  latency: number;
  errorRate: number;
  availability: number;
  responseTime: number;
  memoryUsage?: number;
  cpuUsage?: number;
  activeConnections?: number;
  throughput?: number;
}