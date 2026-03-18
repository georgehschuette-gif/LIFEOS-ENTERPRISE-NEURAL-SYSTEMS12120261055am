import { HTTP_STATUS } from '../config/constants';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: Record<string, any>,
    public requestId?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      success: false,
      error: this.message,
      statusCode: this.statusCode,
      timestamp: new Date(),
      requestId: this.requestId,
      details: this. details,
    };
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, any>, requestId?: string) {
    super(HTTP_STATUS.BAD_REQUEST, message, details, requestId);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, requestId?: string) {
    super(HTTP_STATUS.NOT_FOUND, `${resource} not found`, undefined, requestId);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', requestId?: string) {
    super(HTTP_STATUS.UNAUTHORIZED, message, undefined, requestId);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', requestId?:  string) {
    super(HTTP_STATUS.FORBIDDEN, message, undefined, requestId);
    this.name = 'ForbiddenError';
  }
}

export class ConflictError extends AppError {
  constructor(message:  string, requestId?: string) {
    super(HTTP_STATUS.CONFLICT, message, undefined, requestId);
    this.name = 'ConflictError';
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal server error', details?: Record<string, any>, requestId?: string) {
    super(HTTP_STATUS.INTERNAL_SERVER_ERROR, message, details, requestId);
    this.name = 'InternalServerError';
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(service: string, requestId?: string) {
    super(HTTP_STATUS.SERVICE_UNAVAILABLE, `${service} service unavailable`, undefined, requestId);
    this.name = 'ServiceUnavailableError';
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Rate limit exceeded', requestId?: string) {
    super(HTTP_STATUS.TOO_MANY_REQUESTS, message, undefined, requestId);
    this.name = 'RateLimitError';
  }
}

export const isAppError = (error: any): error is AppError => {
  return error instanceof AppError;
};

export const handleError = (error: any, requestId?: string): AppError => {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new InternalServerError(error.message, { originalError: error. name }, requestId);
  }

  return new InternalServerError('Unknown error occurred', { originalError: error }, requestId);
};