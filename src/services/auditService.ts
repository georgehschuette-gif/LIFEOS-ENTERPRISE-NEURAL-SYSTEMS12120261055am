import { getLoggerService } from '../utils/logger';

const logger = getLoggerService('AuditService');

/**
 * Audit Service
 * Logs and tracks all system operations for compliance
 */
export class AuditService {
  async logRecoveryAction(recovery: any, userId?:  string): Promise<void> {
    try {
      const auditLog = {
        timestamp: new Date(),
        action: 'RECOVERY_EXECUTED',
        component: recovery.component,
        type: recovery.type,
        userId,
        details: {
          recoveryId: recovery.id,
          status: recovery.status,
          result: recovery.result,
        },
      };

      logger. info('Recovery action logged', auditLog);
    } catch (error) {
      logger.error('Failed to log recovery action', error as Error);
    }
  }

  async logAnomalyDetection(anomaly: any): Promise<void> {
    try {
      const auditLog = {
        timestamp: new Date(),
        action: 'ANOMALY_DETECTED',
        component: anomaly.component,
        type: anomaly.type,
        severity: anomaly.severity,
        details: {
          anomalyId: anomaly.id,
          confidence: anomaly.confidence,
          impact: anomaly.impact,
        },
      };

      logger. info('Anomaly detection logged', auditLog);
    } catch (error) {
      logger.error('Failed to log anomaly detection', error as Error);
    }
  }

  async logSystemStateChange(oldState: any, newState: any): Promise<void> {
    try {
      const auditLog = {
        timestamp: new Date(),
        action: 'SYSTEM_STATE_CHANGED',
        oldHealth: oldState.health,
        newHealth: newState.health,
        details: {
          oldStatus: oldState.status,
          newStatus: newState.status,
        },
      };

      logger.info('System state change logged', auditLog);
    } catch (error) {
      logger.error('Failed to log system state change', error as Error);
    }
  }
}

export const auditService = new AuditService();

export default AuditService;