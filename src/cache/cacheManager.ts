import { RedisCache } from '../config/redis';
import { getLoggerService } from '../utils/logger';
import { CACHE_KEYS } from '../config/constants';

const logger = getLoggerService('CacheManager');

/**
 * Cache Manager
 * Manages application-level caching
 */
export class CacheManager {
  private cache: RedisCache;

  constructor() {
    this.cache = new RedisCache();
  }

  async initialize(): Promise<void> {
    try {
      await this.cache.initialize();
      logger.info('Cache manager initialized');
    } catch (error) {
      logger.error('Failed to initialize cache', error as Error);
      throw error;
    }
  }

  async getSystemState(): Promise<any | null> {
    try {
      return await this.cache.get(CACHE_KEYS.SYSTEM_STATE);
    } catch (error) {
      logger.error('Failed to get system state from cache', error as Error);
      return null;
    }
  }

  async setSystemState(state: any, ttl?:  number): Promise<void> {
    try {
      await this. cache.set(CACHE_KEYS.SYSTEM_STATE, state, ttl);
    } catch (error) {
      logger.error('Failed to set system state in cache', error as Error);
    }
  }

  async getComponentHealth(component: string): Promise<any | null> {
    try {
      return await this.cache.get(`${CACHE_KEYS.COMPONENT_HEALTH}${component}`);
    } catch (error) {
      logger.error('Failed to get component health from cache', error as Error);
      return null;
    }
  }

  async setComponentHealth(component: string, health: any, ttl?: number): Promise<void> {
    try {
      await this.cache.set(`${CACHE_KEYS.COMPONENT_HEALTH}${component}`, health, ttl);
    } catch (error) {
      logger.error('Failed to set component health in cache', error as Error);
    }
  }

  async getAnomalies(): Promise<any[] | null> {
    try {
      return await this.cache.get(CACHE_KEYS.ANOMALIES);
    } catch (error) {
      logger.error('Failed to get anomalies from cache', error as Error);
      return null;
    }
  }

  async setAnomalies(anomalies: any[], ttl?: number): Promise<void> {
    try {
      await this.cache.set(CACHE_KEYS.ANOMALIES, anomalies, ttl);
    } catch (error) {
      logger.error('Failed to set anomalies in cache', error as Error);
    }
  }

  async invalidateAll(): Promise<void> {
    try {
      await this.cache.clear();
      logger.info('Cache invalidated');
    } catch (error) {
      logger.error('Failed to invalidate cache', error as Error);
    }
  }
}

export const cacheManager = new CacheManager();

export default CacheManager;