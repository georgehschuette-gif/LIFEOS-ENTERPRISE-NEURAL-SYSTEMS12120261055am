import { AutonomousRecoveryEngine } from '../core/autonomousRecovery';
import { ComponentHealth } from '../types';

async function runFailureCascadeTest() {
  console.log('🔥 Starting LIFEOS Failure Cascade Test');

  const engine = new AutonomousRecoveryEngine();

  const testComponent: ComponentHealth = {
    id: 'test-comp-1',
    name: 'TestService',
    type: 'service',
    status: 'healthy',
    metrics: {
      latency: 20,
      throughput: 100,
      errorRate: 0.01,
      availability: 1.0,
    },
    dependencies: ['DatabaseA'],
    lastCheck: new Date(),
    failureProbability: 0.01,
    recoveryTimeEstimate: 2000,
    checkHistory: [],
    metadata: {},
    createdAt: new Date(),
    updatedAt: new Date()
  };

  engine.emit('registerComponent', testComponent);

  console.log('⚡ Stage 1: Latency spike');
  engine.emit('updateMetrics', { id: 'test-comp-1', latency: 500 });

  console.log('⚡ Stage 2: Error rate surge');
  engine.emit('updateMetrics', { id: 'test-comp-1', errorRate: 0.5 });

  console.log('⚡ Stage 3: Availability drop');
  engine.emit('updateMetrics', { id: 'test-comp-1', availability: 0.4 });

  console.log('⚡ Stage 4: Dependency failure');
  engine.emit('updateDependencies', {
    id: 'test-comp-1',
    dependencies: ['DatabaseA', 'NetworkDown']
  });

  console.log('⚡ Stage 5: Full component crash');
  engine.emit('updateStatus', { id: 'test-comp-1', status: 'failed' });

  console.log('🏁 Failure cascade test complete');
}

runFailureCascadeTest();