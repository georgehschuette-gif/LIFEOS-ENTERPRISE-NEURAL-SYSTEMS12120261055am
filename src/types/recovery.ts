export interface Anomaly extends BaseEntity {
  component: string;
  type: AnomalyType;
  severity: AnomalySeverity;
  description: string;
  detectedAt: Date;
  resolvedAt?: Date;
  rootCause?: string;
  impact: number;
  confidence: number;
  affectedSessions?: number;
  estimatedDamage?: number;
  metadata: Record<string, any>;
}

export type AnomalyType =
  | 'performance'
  | 'security'
  | 'availability'
  | 'data'
  | 'model'
  | 'resource'
  | 'dependency';

export type AnomalySeverity = 'low' | 'medium' | 'high' | 'critical';import { BaseEntity } from './index';

export interface RecoveryAction extends BaseEntity {
  anomalyId: string;
  type: RecoveryType;
  component: string;
  status: RecoveryStatus;
  parameters: Record<string, any>;
  estimatedTime: number;
  successProbability: number;
  cost:  number;
  executedAt?: Date;
  completedAt?: Date;
  result?: RecoveryResult;
  details?: string;
  retries:  number;
  maxRetries: number;
  rollbackAction?: RecoveryAction;
}

export type RecoveryType =
  | 'restart'
  | 'scale'
  | 'rollback'
  | 'replace'
  | 'isolate'
  | 'optimize'
  | 'circuit_break'
  | 'throttle';

export type RecoveryStatus =
  | 'pending'
  | 'executing'
  | 'success'
  | 'partial'
  | 'failed'
  | 'rolled_back'
  | 'cancelled';

export type RecoveryResult = 'success' | 'partial' | 'failed';

export interface Optimization extends BaseEntity {
  component: string;
  type: OptimizationType;
  description: string;
  potentialGain: number;
  implementationCost: number;
  complexity: OptimizationComplexity;
  estimatedTime: number;
  riskLevel: 'low' | 'medium' | 'high';
  status: OptimizationStatus;
  executedAt?: Date;
  result?: OptimizationResult;
}

export type OptimizationType =
  | 'performance'
  | 'cost'
  | 'security'
  | 'reliability'
  | 'resource'
  | 'efficiency';

export type OptimizationComplexity = 'low' | 'medium' | 'high';

export type OptimizationStatus =
  | 'identified'
  | 'planned'
  | 'executing'
  | 'completed'
  | 'failed'
  | 'skipped';

export interface OptimizationResult {
  success: boolean;
  gainAchieved: number;
  actualCost: number;
  timeTaken: number;
  details:  string;
}

export interface Experience {
  id?:  string;
  state: number[];
  action: number[];
  reward: number;
  nextState: number[];
  done: boolean;
  timestamp?:  Date;
}

export interface RecoveryRule extends BaseEntity {
  name: string;
  condition: (anomaly: any) => boolean;
  action:  RecoveryType;
  priority: number;
  enabled: boolean;
}

export interface FailurePattern {
  id:  string;
  type: string;
  severity: string;
  componentPattern?:  string;
  symptoms: string[];
  frequency: number;
  lastSeen:  Date;
}

export interface RecoverySolution extends BaseEntity {
  pattern: FailurePattern;
  action: RecoveryType;
  parameters: Record<string, any>;
  successCount: number;
  failureCount: number;
  confidence: number;
  lastUsed?:  Date;
}