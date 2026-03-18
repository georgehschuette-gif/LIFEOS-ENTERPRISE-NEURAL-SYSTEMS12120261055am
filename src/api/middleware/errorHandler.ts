import { Request, Response, NextFunction } from 'express';
import { AppError, isAppError } from '../../utils/errorHandler';
import { getLoggerService } from '../../utils/logger';

const logger = getLoggerService('ErrorHandler');

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const requestId = req.id;

  if (isAppError(err)) {
    logger.warn(`API Error: ${err.message}`, { requestId, statusCode: err.statusCode });
    res.status(err.statusCode).json(err.toJSON());
  } else {
    logger.error(`Unexpected Error: ${err.message}`, err, { requestId });
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      statusCode: 500,
      timestamp: new Date(),
      requestId,
    });
  }
};

export default errorHandler;