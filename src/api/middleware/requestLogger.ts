import { Request, Response, NextFunction } from 'express';
import { getLoggerService } from '../../utils/logger';
import { Helper } from '../../utils/helpers';

const logger = getLoggerService('RequestLogger');

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  const requestId = Helper.generateRequestId();
  (req as any).id = requestId;

  const originalSend = res.send;
  res.send = function (data) {
    const duration = Date. now() - startTime;
    logger.info(`${req.method} ${req.path}`, {
      requestId,
      statusCode: res.statusCode,
      duration,
      method: req.method,
      path: req.path,
    });

    return originalSend. call(this, data);
  };

  next();
};

export default requestLogger;