import { RecoveryRule, FailurePattern, RecoverySolution, Anomaly } from '../types';
import { getLoggerService } from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

const logger = getLoggerService('KnowledgeBase');

/**
 * Knowledge Base
 * Stores recovery patterns, rules, and solutions
 */
export class KnowledgeBase {
  private rules: RecoveryRule[] = [];
  private patterns: FailurePattern[] = [];
  private solutions: RecoverySolution[] = [];

  constructor() {
    this.initializeDefaultKnowledge();
  }

  private initializeDefaultKnowledge(): void {
    // Add default rules
    logger.info('Knowledge base initialized with default knowledge');
  }

  addRule(rule: RecoveryRule): void {
    this.rules. push(rule);
    logger.info(`Rule added: ${rule.name}`);
  }

  getRules(): RecoveryRule[] {
    return [... this.rules];
  }

  addPattern(pattern: FailurePattern): void {
    this.patterns.push(pattern);
    logger.info(`Pattern added: ${pattern.type}`);
  }

  getPatterns(): FailurePattern[] {
    return [...this.patterns];
  }

  addSolution(solution: RecoverySolution): void {
    this.solutions.push(solution);
    logger.info(`Solution added for pattern: ${solution.pattern. type}`);
  }

  findMatchingRules(anomaly: Anomaly): RecoveryRule[] {
    return this.rules.filter(
      (rule) => rule.enabled && rule.condition(anomaly)
    ).sort((a, b) => b.priority - a.priority);
  }

  findMatchingPatterns(anomaly: Anomaly): FailurePattern[] {
    return this.patterns.filter(
      (pattern) =>
        pattern.type === anomaly.type && pattern.severity === anomaly.severity
    );
  }

  findRecoverySolution(anomaly: Anomaly): RecoverySolution | null {
    for (const solution of this.solutions) {
      if (this.matchesPattern(anomaly, solution. pattern)) {
        return solution;
      }
    }
    return null;
  }

  private matchesPattern(anomaly:  Anomaly, pattern: FailurePattern): boolean {
    return (
      anomaly.type === pattern.type &&
      anomaly.severity === pattern.severity &&
      (pattern.componentPattern
        ? anomaly.component. includes(pattern.componentPattern)
        : true)
    );
  }

  updatePatternFrequency(patternId: string): void {
    const pattern = this.patterns.find((p) => p.id === patternId);
    if (pattern) {
      pattern.frequency += 1;
      pattern.lastSeen = new Date();
    }
  }

  updateSolutionMetrics(solutionId: string, success: boolean): void {
    const solution = this.solutions.find((s) => s.id === solutionId);
    if (solution) {
      if (success) {
        solution. successCount += 1;
      } else {
        solution.failureCount += 1;
      }
      const total = solution.successCount + solution. failureCount;
      solution. confidence = solution.successCount / total;
      solution.updatedAt = new Date();
    }
  }

  getTopSolutions(limit: number = 10): RecoverySolution[] {
    return [... this.solutions]
      .sort((a, b) => b.confidence - a. confidence)
      .slice(0, limit);
  }
}

export default KnowledgeBase;