import {
  BaseEntity,
  ComponentHealth,
  ComponentMetrics,
  ComponentStatus,
  SystemMetrics,
  ResourceUtilization,
  HealthCheckRecord,
  Anomaly,
  AnomalySeverity,
  RecoveryAction,
  Optimization
} from './index';

export interface SystemState extends BaseEntity {
  health: number;
  components: Map<string, ComponentHealth>;
  metrics: SystemMetrics;
  anomalies: Anomaly[];
  recoveryActions: RecoveryAction[];
  optimizationOpportunities: Optimization[];
  timestamp: Date;
  version: number;
  status: 'healthy' | 'degraded' | 'unhealthy' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}