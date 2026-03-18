import { Repository } from 'typeorm';
import { RecoveryAction } from '../../types';
import BaseRepository from './baseRepository';
import { getLoggerService } from '../../utils/logger';

const logger = getLoggerService('RecoveryRepository');

export class RecoveryRepository extends BaseRepository<RecoveryAction> {
  constructor(repo: Repository<RecoveryAction>) {
    super(repo);
  }

  async findPending(): Promise<RecoveryAction[]> {
    try {
      return await this.repo.find({
        where: { status: 'pending' },
        order: { createdAt: 'ASC' } as any,
      });
    } catch (error) {
      logger.error('Failed to find pending recoveries', error as Error);
      throw error;
    }
  }

  async findSuccessful(): Promise<RecoveryAction[]> {
    try {
      return await this.repo.find({
        where: { result: 'success' },
        order: { createdAt: 'DESC' } as any,
      });
    } catch (error) {
      logger.error('Failed to find successful recoveries', error as Error);
      throw error;
    }
  }

  async findFailed(): Promise<RecoveryAction[]> {
    try {
      return await this.repo.find({
        where: { result: 'failed' },
        order: { createdAt: 'DESC' } as any,
      });
    } catch (error) {
      logger.error('Failed to find failed recoveries', error as Error);
      throw error;
    }
  }
}

export default RecoveryRepository;