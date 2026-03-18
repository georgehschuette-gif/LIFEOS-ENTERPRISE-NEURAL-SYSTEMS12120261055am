import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export class Helper {
  static generateId(): string {
    return uuidv4();
  }

  static generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static async retry<T>(
    fn: () => Promise<T>,
    retries: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        if (i < retries - 1) {
          await this.sleep(delayMs * Math.pow(2, i)); // Exponential backoff
        }
      }
    }

    throw lastError || new Error('Max retries exceeded');
  }

  static hash(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  static encrypt(data: string, key: string): string {
    const cipher = crypto.createCipher('aes192', key);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  static decrypt(encrypted: string, key: string): string {
    const decipher = crypto.createDecipher('aes192', key);
    let decrypted = decipher. update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  static deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  static flatten(obj: Record<string, any>, prefix = ''): Record<string, any> {
    const flattened: Record<string, any> = {};

    for (const key in obj) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(flattened, this.flatten(value, newKey));
      } else {
        flattened[newKey] = value;
      }
    }

    return flattened;
  }

  static parseQueryParams(queryString: string): Record<string, any> {
    const params:  Record<string, any> = {};
    const searchParams = new URLSearchParams(queryString);

    for (const [key, value] of searchParams) {
      if (params[key]) {
        if (Array.isArray(params[key])) {
          params[key].push(value);
        } else {
          params[key] = [params[key], value];
        }
      } else {
        params[key] = value;
      }
    }

    return params;
  }

  static formatBytes(bytes: number, decimals:  number = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ?  0 :  decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  static formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }

  static calculatePercentageChange(oldValue: number, newValue: number): number {
    if (oldValue === 0) return newValue === 0 ? 0 :  100;
    return ((newValue - oldValue) / oldValue) * 100;
  }

  static round(value: number, decimals:  number = 2): number {
    return Math. round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  static isValidJSON(json: string): boolean {
    try {
      JSON.parse(json);
      return true;
    } catch {
      return false;
    }
  }

  static getEnumValues<T extends Record<string, any>>(enumObj: T): T[keyof T][] {
    return Object.values(enumObj);
  }

  static mapEnumToArray<T extends Record<string, any>>(enumObj: T): { key: string; value: string }[] {
    return Object. entries(enumObj).map(([key, value]) => ({
      key,
      value:  String(value),
    }));
  }
}

export default Helper;