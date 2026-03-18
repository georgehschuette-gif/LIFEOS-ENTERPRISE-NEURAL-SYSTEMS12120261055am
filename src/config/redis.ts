import { createClient, RedisClientType } from 'redis';
import { environment } from './environment';
import { logger } from './logger';

/**
 * Redis Cache Configuration
 * Handles caching and session management
 */

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  ttl: number;
}

// Widen the Redis client type to avoid generic mismatch errors
let redisClient: RedisClientType<any, any, any> | null = null;

/**
 * Get or create Redis client
 */
export const getRedisClient = async (): Promise<RedisClientType<any, any, any>> => {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  try {
    const client = createClient({
      socket: {
        host: environment.redis.host,
        port: environment.redis.port,
      },
      password: environment.redis.password,
    });

    client.on('error', (error) => {
      logger.error('Redis client error', error as Error);
    });

    client.on('connect', () => {
      logger.info('Redis client connected');
    });

    client.on('disconnect', () => {
      logger.info('Redis client disconnected');
    });

    await client.connect();
    redisClient = client;

    return client;
  } catch (error) {
    logger.error('Failed to create Redis client', error as Error);
    throw error;
  }
};

/**
 * Close Redis connection
 */
export const closeRedisConnection = async (): Promise<void> => {
  if (redisClient && redisClient.isOpen) {
    await redisClient.disconnect();
    redisClient = null;
    logger.info('Redis connection closed');
  }
};

/**
 * Redis cache wrapper class
 */
export class RedisCache {
  private client: RedisClientType<any, any, any> | null = null;

  async initialize(): Promise<void> {
    this.client = await getRedisClient();
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.client) throw new Error('Redis client not initialized');
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    if (!this.client) throw new Error('Redis client not initialized');
    const ttlSeconds = ttl || environment.redis.ttl;
    await this.client.setEx(key, ttlSeconds, JSON.stringify(value));
  }

  async del(key: string): Promise<void> {
    if (!this.client) throw new Error('Redis client not initialized');
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    if (!this.client) throw new Error('Redis client not initialized');
    return (await this.client.exists(key)) > 0;
  }

  async clear(): Promise<void> {
    if (!this.client) throw new Error('Redis client not initialized');
    await this.client.flushDb();
  }
}

export const redisConfig: RedisConfig = {
  host: environment.redis.host,
  port: environment.redis.port,
  password: environment.redis.password,
  ttl: environment.redis.ttl,
};

export default redisConfig;