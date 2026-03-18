import { EventEmitter } from 'events';
import { SystemState, ComponentHealth } from '../types';
import { getLoggerService } from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

const logger = getLoggerService('StateManager');

/**
 * State Manager
 * Manages and persists application state
 */
export class StateManager extends EventEmitter {
  private state: SystemState;
  private stateHistory: SystemState[] = [];
  private readonly MAX_HISTORY = 100;

  constructor(initialState: SystemState) {
    super();
    this.state = initialState;
    logger.info('State manager initialized');
  }

  getState(): SystemState {
    return { ...this.state };
  }

  setState(newState: Partial<SystemState>): void {
    const previousState = { ...this.state };

    this.state = {
      ...this.state,
      ...newState,
      timestamp: new Date(),
      version: this.state.version + 1,
    };

    this.stateHistory.push(previousState);
    if (this.stateHistory.length > this.MAX_HISTORY) {
      this.stateHistory.shift();
    }

    this.emit('state:changed', this.state);
    logger.debug('State updated', { version: this.state.version });
  }

  updateComponent(component: ComponentHealth): void {
    this.state.components.set(component.name, component);
    this.setState({ components: this.state.components });
  }

  updateMetrics(metrics: Partial<typeof this.state.metrics>): void {
    this.setState({
      metrics: {
        ...this.state.metrics,
        ...metrics,
        lastUpdated: new Date(),
      },
    });
  }

  addAnomaly(anomaly: any): void {
    this.state.anomalies.push(anomaly);
    this.setState({ anomalies: this.state.anomalies });
  }

  removeAnomaly(anomalyId: string): void {
    this.state.anomalies = this.state.anomalies.filter((a) => a.id !== anomalyId);
    this.setState({ anomalies: this.state.anomalies });
  }

  addRecovery(recovery: any): void {
    this.state.recoveryActions.push(recovery);
    this.setState({recoveryActions:this.state.recoveryActions});
  }

  getHistory(limit: number = 10): SystemState[] {
    return this.stateHistory.slice(-limit);
  }

  clearHistory(): void {
    this.stateHistory = [];
    logger.info('State history cleared');
  }

  reset(initialState: SystemState): void {
    this.state = initialState;
    this.stateHistory = [];
    this.emit('state:reset', this.state);
    logger.info('State reset to initial state');
  }
}