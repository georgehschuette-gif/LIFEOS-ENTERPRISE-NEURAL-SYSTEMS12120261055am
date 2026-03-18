import axios, { AxiosInstance } from 'axios';
import { EventEmitter } from 'events';
import { ServiceConfig, ServiceHealthResponse, HealthCheckMetrics } from '../../types';
import { getLoggerService } from '../../utils/logger';
import { Helper } from '../../utils/helpers';

const logger = getLoggerService('ServiceHealthCheck');

interface HealthCheckHistory {
  timestamp: Date;
  status: string;
  latency: number;
  errorRate: number;
}

/**
 * Service Health Check
 * Monitors individual service health
 */
export class ServiceHealthCheck extends EventEmitter {
  private client: AxiosInstance;
  private config: ServiceConfig;
  private history: HealthCheckHistory[] = [];
  private readonly MAX_HISTORY = 1000;
  private monitoringInterval: NodeJS. Timeout | null = null;
  private lastErrorTime: Date | null = null;
  private consecutiveFailures = 0;
  private readonly MAX_CONSECUTIVE_FAILURES = 5;
  private lastStatus: ServiceHealthResponse['status'] = 'healthy';

  constructor(config: ServiceConfig) {
    super();
    this.config = config;
    this.client = axios.create({
      timeout: config.timeout,
      validateStatus: () => true,
    });
  }

  startMonitoring(): void {
    if (this.monitoringInterval) {
      logger.warn(`Health check already running for ${this.config.name}`);
      return;
    }

    logger.info(`Starting health check for ${this.config.name} (interval: ${this.config.interval}ms)`);

    this.performHealthCheck().catch(console.error);

    this.monitoringInterval = setInterval(
      () => this.performHealthCheck().catch(console.error),
      this.config.interval
    );
  }

  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      logger.info(`Stopped health check for ${this.config.name}`);
    }
  }

  async performHealthCheck(): Promise<ServiceHealthResponse> {
    const startTime = Date.now();
    let response: ServiceHealthResponse;

    try {
      const result = await this.executeHealthCheckWithRetry();
      const latency = Date.now() - startTime;

      response = {
        status:  this.determineStatus(result, latency),
        latency,
        timestamp: new Date(),
        details: result,
      };

      if (response.status === 'healthy') {
        this.consecutiveFailures = 0;
        this.lastErrorTime = null;
      } else {
        this.consecutiveFailures++;
      }
    } catch (error) {
      const latency = Date.now() - startTime;
      this.consecutiveFailures++;
      this.lastErrorTime = new Date();

      response = {
        status: 'failed',
        latency,
        timestamp: new Date(),
        details: {},
        error: error instanceof Error ? error.message : String(error),
      };
    }

    this.recordHistory(response);

    if (response.status !== this.lastStatus) {
      this.lastStatus = response.status;
      this.emit('health:status-changed', {
        service: this.config. name,
        status: response. status,
      });
    }

    this.emit('health:check', response);

    if (this.consecutiveFailures >= this. MAX_CONSECUTIVE_FAILURES) {
      this.emit('health:alert', {
        service: this. config.name,
        status: response.status,
        consecutiveFailures: this.consecutiveFailures,
        lastError: response.error,
      });
    }

    return response;
  }

  private async executeHealthCheckWithRetry(attempt = 1): Promise<Record<string, any>> {
    try {
      const url = `${this.config.endpoint}${this.config.healthCheckPath}`;
      const response = await this.client.get(url);

      if (response.status >= 200 && response.status < 300) {
        return response.data || {};
      }

      if (attempt < this.config.retries) {
        await Helper.sleep(100 * attempt);
        return this.executeHealthCheckWithRetry(attempt + 1);
      }

      throw new Error(`HTTP ${response.status}:  ${response.statusText}`);
    } catch (error) {
      if (attempt < this.config.retries) {
        await Helper.sleep(100 * attempt);
        return this.executeHealthCheckWithRetry(attempt + 1);
      }
      throw error;
    }
  }

  private determineStatus(details: Record<string, any>, latency:  number): ServiceHealthResponse['status'] {
    if (latency > this.config.thresholds.latencyCritical) {
      return 'unhealthy';
    }
    if (latency > this. config.thresholds.latencyWarning) {
      return 'degraded';
    }

    if (details.errorRate !== undefined) {
      if (details.errorRate > this. config.thresholds.errorRateCritical) {
        return 'unhealthy';
      }
      if (details. errorRate > this.config.thresholds.errorRateWarning) {
        return 'degraded';
      }
    }

    if (details.availability !== undefined) {
      if (details.availability < this.config. thresholds.availabilityWarning) {
        return 'degraded';
      }
    }

    return 'healthy';
  }

  private recordHistory(response: ServiceHealthResponse): void {
    this.history.push({
      timestamp: response.timestamp,
      status: response.status,
      latency: response.latency,
      errorRate: response.details.errorRate || 0,
    });

    if (this.history.length > this.MAX_HISTORY) {
      this.history.shift();
    }
  }

  extractMetrics(details: Record<string, any>): HealthCheckMetrics {
    return {
      latency: details. latency || 0,
      errorRate:  details.errorRate || 0,
      availability: details.availability || 100,
      responseTime: details.responseTime || 0,
      memoryUsage: details.memoryUsage,
      cpuUsage: details.cpuUsage,
      activeConnections: details.activeConnections,
      throughput: details.throughput,
    };
  }

  getHistory(limit: number = 100): HealthCheckHistory[] {
    return this.history. slice(-limit);
  }

  getStatistics(): {
    averageLatency: number;
    maxLatency: number;
    minLatency: number;
    healthyCount: number;
    degradedCount: number;
    failureRate: number;
  } {
    if (this.history.length === 0) {
      return {
        averageLatency: 0,
        maxLatency: 0,
        minLatency:  0,
        healthyCount: 0,
        degradedCount: 0,
        failureRate: 0,
      };
    }

    const latencies = this.history.map((h) => h.latency);
    const failures = this.history.filter((h) => h.status === 'failed').length;

    return {
      averageLatency: latencies.reduce((a, b) => a + b, 0) / latencies.length,
      maxLatency: Math.max(... latencies),
      minLatency: Math.min(...latencies),
      healthyCount: this. history.filter((h) => h.status === 'healthy').length,
      degradedCount: this.history.filter((h) => h.status === 'degraded').length,
      failureRate: failures / this.history.length,
    };
  }

  async getStatus(): Promise<ServiceHealthResponse> {
    return this.performHealthCheck();
  }
}

export default ServiceHealthCheck;