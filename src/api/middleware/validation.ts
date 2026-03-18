import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';
import { ValidationError } from '../../utils/errorHandler';

/**
 * Validation middleware factory
 */
export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.reduce((acc:  any, err) => {
        acc[err. path. join('.')] = err.message;
        return acc;
      }, {});

      throw new ValidationError('Validation failed', details, req.id);
    }

    req.body = value;
    next();
  };
};

/**
 * Common validation schemas
 */
export const schemas = {
  recoveryTrigger:  Joi.object({
    component: Joi.string().required(),
    type: Joi.string()
      .valid('restart', 'scale', 'rollback', 'replace', 'isolate', 'optimize')
      .required(),
  }),

  optimizationExecute: Joi.object({
    optimizationId: Joi.string().uuid().required(),
  }),

  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
  }),
};

export default validate;