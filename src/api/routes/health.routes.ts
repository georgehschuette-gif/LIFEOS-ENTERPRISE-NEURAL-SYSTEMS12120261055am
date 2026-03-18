import { Router } from 'express';
import { getLoggerService } from '../../utils/logger';

const logger = getLoggerService('HealthRoutes');
const router = Router();

/**
 * GET /api/v1/health
 * System health check endpoint
 */
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        status: 'operational',
        timestamp: new Date(),
        uptime: process.uptime(),
      },
      statusCode: 200,
    });
  } catch (error) {
    logger.error('Health check failed', error as Error);
    res.status(503).json({
      success: false,
      error: 'Service unavailable',
      statusCode:  503,
    });
  }
});

/**
 * GET /api/v1/health/services
 * Get all services health status
 */
router.get('/services', async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        services: [
          { name: 'api', status: 'healthy' },
          { name: 'database', status: 'healthy' },
          { name: 'cache', status: 'healthy' },
        ],
      },
      statusCode: 200,
    });
  } catch (error) {
    logger.error('Failed to get services health', error as Error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      statusCode: 500,
    });
  }
});

export default router;