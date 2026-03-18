import { getLoggerService } from '../utils/logger';
import { environment } from '../config/environment';

const logger = getLoggerService('NotificationService');

/**
 * Notification Service
 * Handles notifications via email, Slack, etc.
 */
export class NotificationService {
  async notifyAnomaly(anomaly: any): Promise<void> {
    try {
      const message = `Anomaly Detected: ${anomaly.type} in ${anomaly.component} (severity: ${anomaly.severity})`;

      if (environment.slack.enabled) {
        await this.sendSlackNotification(message);
      }

      if (environment.email.enabled) {
        await this.sendEmailNotification(message);
      }

      logger.info(`Anomaly notification sent: ${anomaly.id}`);
    } catch (error) {
      logger.error('Failed to send anomaly notification', error as Error);
    }
  }

  async notifyRecovery(recovery: any, success: boolean): Promise<void> {
    try {
      const status = success ? 'SUCCESS' : 'FAILED';
      const message = `Recovery ${status}: ${recovery.type} on ${recovery.component}`;

      if (environment.slack.enabled) {
        await this.sendSlackNotification(message);
      }

      logger.info(`Recovery notification sent: ${recovery.id}`);
    } catch (error) {
      logger.error('Failed to send recovery notification', error as Error);
    }
  }

  private async sendSlackNotification(message: string): Promise<void> {
    try {
      const axios = await import('axios');
      await axios.default.post(environment.slack.webhookUrl, {
        text:  `[LifeOS] ${message}`,
        channel: '#lifeos-alerts',
      });
    } catch (error) {
      logger.error('Failed to send Slack notification', error as Error);
    }
  }

  private async sendEmailNotification(message: string): Promise<void> {
    try {
      // Email sending logic here
      logger.info(`Email notification prepared: ${message}`);
    } catch (error) {
      logger.error('Failed to send email notification', error as Error);
    }
  }
}

export const notificationService = new NotificationService();

export default NotificationService;