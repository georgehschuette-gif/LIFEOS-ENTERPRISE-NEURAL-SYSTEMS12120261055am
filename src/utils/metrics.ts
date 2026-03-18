import { register, Counter, Histogram, Gauge } from 'prom-client';

export class MetricsCollector {
  private static instance: MetricsCollector;

  readonly healthCheckCounter = new Counter({
    name: 'lifeos_health_checks_total',
    help: 'Total health checks performed',
    labelNames: ['component', 'status'],
  });

  readonly anomalyCounter = new Counter({
    name:  'lifeos_anomalies_detected_total',
    help: 'Total anomalies detected',
    labelNames: ['type', 'severity'],
  });

  readonly recoveryCounter = new Counter({
    name:  'lifeos_recoveries_executed_total',
    help: 'Total recovery actions executed',
    labelNames:  ['type', 'result'],
  });

  readonly healthCheckDuration = new Histogram({
    name: 'lifeos_health_check_duration_ms',
    help: 'Health check duration in milliseconds',
    labelNames: ['component'],
    buckets: [10, 50, 100, 500, 1000, 5000],
  });

  readonly recoveryDuration = new Histogram({
    name: 'lifeos_recovery_duration_ms',
    help: 'Recovery action duration in milliseconds',
    labelNames: ['type'],
    buckets: [100, 500, 1000, 5000, 10000, 30000],
  });

  readonly apiResponseTime = new Histogram({
    name: 'http_request_duration_ms',
    help: 'HTTP request response time in milliseconds',
    labelNames: ['method', 'route', 'status'],
    buckets: [10, 50, 100, 500, 1000, 5000],
  });

  readonly systemHealth = new Gauge({
    name: 'lifeos_system_health',
    help: 'Current system health percentage',
  });

  readonly activeAnomalies = new Gauge({
    name: 'lifeos_active_anomalies',
    help: 'Number of active anomalies',
    labelNames: ['severity'],
  });

  readonly componentHealth = new Gauge({
    name: 'lifeos_component_health',
    help: 'Component health status',
    labelNames: ['component'],
  });

  readonly pendingRecoveries = new Gauge({
    name: 'lifeos_pending_recoveries',
    help: 'Number of pending recovery actions',
    labelNames: ['type'],
  });

  private constructor() {}

  static getInstance(): MetricsCollector {
    if (!MetricsCollector.instance) {
      MetricsCollector.instance = new MetricsCollector();
    }
    return MetricsCollector.instance;
  }

  async getMetrics(): Promise<string> {
  return await register.metrics();
}
  recordHealthCheck(component: string, status: string, duration: number): void {
    this.healthCheckCounter.inc({ component, status });
    this.healthCheckDuration.observe({ component }, duration);
  }

  recordAnomaly(type:  string, severity: string): void {
    this.anomalyCounter.inc({ type, severity });
  }

  recordRecovery(type: string, result: string, duration: number): void {
    this.recoveryCounter.inc({ type, result });
    this.recoveryDuration.observe({ type }, duration);
  }

  recordApiRequest(method: string, route: string, status: number, duration: number): void {
    this.apiResponseTime.observe({ method, route, status }, duration);
  }

  setSystemHealth(health: number): void {
    this.systemHealth.set(health);
  }

  setComponentHealth(component: string, health:  number): void {
    this.componentHealth.set({ component }, health);
  }
}

export const metrics = MetricsCollector.getInstance();