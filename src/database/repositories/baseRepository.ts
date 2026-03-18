import { Repository } from 'typeorm';
import { BaseEntity } from '../../types';
import { getLoggerService } from '../../utils/logger';
import { v4 as uuidv4 } from 'uuid';

const logger = getLoggerService('BaseRepository');

/**
 * Abstract base repository with common CRUD operations
 */
export abstract class BaseRepository<Entity extends BaseEntity> {
  protected repo: Repository<Entity>;

  constructor(repo: Repository<Entity>) {
    this.repo = repo;
  }

  async create(data: Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>): Promise<Entity> {
    try {
      const entity = this.repo.create({
        ...data,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any);

      // Force TypeORM to use the single-entity overload
     const saved = await this.repo.save(entity);
return saved as unknown as Entity;
    } catch (error) {
      logger.error('Failed to create entity', error as Error);
      throw error;
    }
  }

  async findById(id: string): Promise<Entity | null> {
    try {
      return await this.repo.findOne({ where: { id } as any });
    } catch (error) {
      logger.error('Failed to find entity', error as Error);
      throw error;
    }
  }

  async findAll(skip: number = 0, take: number = 20): Promise<{ data: Entity[]; total: number }> {
    try {
      const [data, total] = await this.repo.findAndCount({
        skip,
        take,
        order: { createdAt: 'DESC' } as any,
      });

      return { data, total };
    } catch (error) {
      logger.error('Failed to find entities', error as Error);
      throw error;
    }
  }

  async update(id: string, data: Partial<Entity>): Promise<Entity | null> {
    try {
      await this.repo.update(id, {
        ...data,
        updatedAt: new Date(),
      } as any);

      return this.findById(id);
    } catch (error) {
      logger.error('Failed to update entity', error as Error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.repo.softDelete(id);
      return result.affected ? result.affected > 0 : false;
    } catch (error) {
      logger.error('Failed to delete entity', error as Error);
      throw error;
    }
  }

  async count(): Promise<number> {
    try {
      return await this.repo.count();
    } catch (error) {
      logger.error('Failed to count entities', error as Error);
      throw error;
    }
  }
}

export default BaseRepository;