import { ValidationError } from './errorHandler';

export class Validator {
  static required(value: any, fieldName: string): void {
    if (value === null || value === undefined || value === '') {
      throw new ValidationError(`${fieldName} is required`);
    }
  }

  static email(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex. test(email)) {
      throw new ValidationError('Invalid email format');
    }
  }

  static url(url: string): void {
    try {
      new URL(url);
    } catch {
      throw new ValidationError('Invalid URL format');
    }
  }

  static number(value: any, fieldName:  string, min?:  number, max?: number): void {
    const num = parseFloat(value);
    if (isNaN(num)) {
      throw new ValidationError(`${fieldName} must be a number`);
    }
    if (min !== undefined && num < min) {
      throw new ValidationError(`${fieldName} must be >= ${min}`);
    }
    if (max !== undefined && num > max) {
      throw new ValidationError(`${fieldName} must be <= ${max}`);
    }
  }

  static range(value: number, min: number, max: number, fieldName: string): void {
    if (value < min || value > max) {
      throw new ValidationError(`${fieldName} must be between ${min} and ${max}`);
    }
  }

  static minLength(value: string, min: number, fieldName: string): void {
    if (value. length < min) {
      throw new ValidationError(`${fieldName} must be at least ${min} characters`);
    }
  }

  static maxLength(value:  string, max: number, fieldName: string): void {
    if (value.length > max) {
      throw new ValidationError(`${fieldName} must not exceed ${max} characters`);
    }
  }

  static enum(value: any, enumValues: any[], fieldName: string): void {
    if (!enumValues.includes(value)) {
      throw new ValidationError(
        `${fieldName} must be one of:  ${enumValues.join(', ')}`
      );
    }
  }

  static object(value: any, fieldName:  string): void {
    if (typeof value !== 'object' || value === null) {
      throw new ValidationError(`${fieldName} must be an object`);
    }
  }

  static array(value:  any, fieldName: string): void {
    if (! Array.isArray(value)) {
      throw new ValidationError(`${fieldName} must be an array`);
    }
  }

  static arrayMinLength(value: any[], min: number, fieldName: string): void {
    if (value.length < min) {
      throw new ValidationError(`${fieldName} must have at least ${min} items`);
    }
  }

  static custom(condition: boolean, message: string): void {
    if (!condition) {
      throw new ValidationError(message);
    }
  }

  static isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  static isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
}

export const validateRequest = (data:  any, rules: Record<string, (value: any) => void>): void => {
  const errors: Record<string, string> = {};

  for (const [field, rule] of Object.entries(rules)) {
    try {
      rule(data[field]);
    } catch (error:  any) {
      errors[field] = error.message;
    }
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError('Validation failed', errors);
  }
};