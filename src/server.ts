import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { Server as HTTPServer } from 'http';
import { getLoggerService } from './utils/logger';
import { environment } from './config/environment';
import { requestLogger } from './api/middleware/requestLogger';
import { errorHandler } from './api/middleware/errorHandler';
import { metrics } from './utils/metrics';

// Routes
import healthRoutes from './api/routes/health.routes';
import systemRoutes from './api/routes/system.routes';
import anomalyRoutes from './api/routes/anomaly.routes';
import recoveryRoutes from './api/routes/recovery.routes';

const logger = getLoggerService('Server');

/**
 * Create and configure Express server
 */
export async function createServer(): Promise<HTTPServer> {
  const app:  Express = express();

  // Trust proxy
  app.set('trust proxy', 1);

  // Middleware
  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: '10mb' }));
  app.use(express. urlencoded({ limit: '10mb', extended: true }));
  app.use(
    cors({
      origin: environment.api.corsOrigin,
      credentials: environment.api.corsCredentials,
    })
  );

  // Request logging
  app.use(requestLogger);

  // Rate limiting
  const limiter = rateLimit({
    windowMs: environment.api.rateLimitWindowMs,
    max: environment. api.rateLimitMaxRequests,
    message: 'Too many requests, please try again later',
  });

  app.use(`${environment.api.prefix}/`, limiter);

  // Metrics endpoint
  if (environment.monitoring.enablePrometheus) {
    app.get('/metrics', (req: Request, res: Response) => {
      res.set('Content-Type', 'text/plain');
      res.send(metrics.getMetrics());
    });
  }

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date() });
  });

  // API Routes
  app.use(`${environment.api.prefix}/health`, healthRoutes);
  app.use(`${environment.api.prefix}/system`, systemRoutes);
  app.use(`${environment.api.prefix}/anomalies`, anomalyRoutes);
  app.use(`${environment.api.prefix}/recoveries`, recoveryRoutes);

  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: 'Not found',
      statusCode: 404,
      timestamp: new Date(),
    });
  });

  // Error handler
  app.use(errorHandler);

  // Start server
  const server = app.listen(environment.port, environment.host, () => {
    logger.info(`Server listening on ${environment.host}:${environment. port}`, {
      environment:  environment.nodeEnv,
      apiPrefix: environment.api.prefix,
    });
  });

  server.on('error', (error) => {
    logger.error('Server error', error as Error);
  });

  return server;
}

export default createServer;