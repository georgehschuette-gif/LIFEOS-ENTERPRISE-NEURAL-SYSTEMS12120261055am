import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../../utils/errorHandler';
import { environment } from '../../config/environment';

export const authenticate = (req: Request, res:  Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new UnauthorizedError('No token provided', req.id);
  }

  try {
    const decoded = jwt.verify(token, environment.jwt.secret) as any;
    (req as any).user = decoded;
    next();
  } catch (error) {
    throw new UnauthorizedError('Invalid token', req.id);
  }
};

export default authenticate;