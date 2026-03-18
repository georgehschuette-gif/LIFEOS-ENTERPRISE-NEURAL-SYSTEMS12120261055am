import { Router } from 'express';
import { getLoggerService } from '../../utils/logger';

const logger = getLoggerService('AnomalyRoutes');
const router = Router();

/**
 * GET /api/v1/anomalies
 * Get all active anomalies
 */
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      data:  {
        anomalies: [],
        total: 0,
      },
      statusCode: 200,
    });
  } catch (error) {
    logger.error('Failed to get anomalies', error as Error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      statusCode: 500,
    });
  }
});

export default router;