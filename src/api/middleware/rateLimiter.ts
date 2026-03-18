import rateLimit from 'express-rate-limit';
import { environment } from '../../config/environment';

/**
 * Global rate limiter
 */
export const globalLimiter = rateLimit({
  windowMs: environment.api.rateLimitWindowMs,
  max: environment. api.rateLimitMaxRequests,
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Strict rate limiter for sensitive endpoints
 */
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many sensitive requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Permissive rate limiter for public endpoints
 */
export const permissiveLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1000, // 1000 requests per minute
  message: 'Rate limit exceeded',
  standardHeaders: true,
  legacyHeaders: false,
});

export default globalLimiter;