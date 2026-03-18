export * from './system';
export * from './health';
export * from './recovery';
export * from './api';
export * from './database';

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasMore: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
  requestId?: string;
  statusCode: number;
}

export interface ErrorResponse {
  success: false;
  error: string;
  statusCode: number;
  timestamp: Date;
  requestId?: string;
  details?: Record<string, any>;
  stack?: string;
}

export interface Metadata {
  [key: string]: any;
}

export interface RequestContext {
  requestId: string;
  userId?: string;
  userRole?: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
}