import { Repository, IsNull } from 'typeorm';
import { Anomaly, AnomalySeverity } from '../../types';
import { BaseRepository } from './baseRepository';
import { getLoggerService } from '../../utils/logger';

const logger = getLoggerService('AnomalyRepository');

/**
 * Anomaly Repository
 * Handles anomaly data persistence
 */
export class AnomalyRepository extends BaseRepository<Anomaly> {
  constructor(repo: Repository<Anomaly>) {
    super(repo);
  }

  async findByComponent(component: string, limit: number = 20): Promise<Anomaly[]> {
    try {
      return await this.repo.find({
        where: { component },
        order: { detectedAt: 'DESC' },
        take: limit,
      });
    } catch (error) {
      logger.error('Failed to find anomalies by component', error as Error);
      throw error;
    }
  }

  async findBySeverity(severity: string, limit: number = 20): Promise<Anomaly[]> {
    try {
      return await this.repo.find({
        where: { severity: severity as AnomalySeverity },
        order: { detectedAt: 'DESC' },
        take: limit,
      });
    } catch (error) {
      logger.error('Failed to find anomalies by severity', error as Error);
      throw error;
    }
  }

  async findActive(): Promise<Anomaly[]> {
    try {
      return await this.repo.find({
        where: { resolvedAt: IsNull() },
        order: { detectedAt: 'DESC' },
      });
    } catch (error) {
      logger.error('Failed to find active anomalies', error as Error);
      throw error;
    }
  }

  async resolveAnomaly(id: string): Promise<Anomaly | null> {
    try {
      return await this.update(id, {
        resolvedAt: new Date(),
      } as any);
    } catch (error) {
      logger.error('Failed to resolve anomaly', error as Error);
      throw error;
    }
  }

  async getAnomalyStats(): Promise<{
    total: number;
    active: number;
    byType: Record<string, number>;
    bySeverity: Record<string, number>;
  }> {
    try {
      const total = await this.repo.count();
      const active = await this.repo.count({ where: { resolvedAt: IsNull() } });

      const anomalies = await this.repo.find();

      const byType: Record<string, number> = {};
      const bySeverity: Record<string, number> = {};

      anomalies.forEach((a) => {
        byType[a.type] = (byType[a.type] || 0) + 1;
        bySeverity[a.severity] = (bySeverity[a.severity] || 0) + 1;
      });

      return { total, active, byType, bySeverity };
    } catch (error) {
      logger.error('Failed to get anomaly stats', error as Error);
      throw error;
    }
  }
}

export default AnomalyRepository;