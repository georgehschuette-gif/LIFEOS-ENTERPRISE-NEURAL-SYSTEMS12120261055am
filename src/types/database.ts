export interface DatabaseQuery {
  sql: string;
  params:  any[];
  executionTime:  number;
  rowsAffected: number;
}

export interface TransactionOptions {
  isolationLevel?:  'READ UNCOMMITTED' | 'READ COMMITTED' | 'REPEATABLE READ' | 'SERIALIZABLE';
  timeout?: number;
}

export interface QueryBuilder {
  select(... fields: string[]): QueryBuilder;
  where(condition: string, params?: any[]): QueryBuilder;
  orderBy(field: string, direction: 'ASC' | 'DESC'): QueryBuilder;
  limit(limit: number): QueryBuilder;
  offset(offset: number): QueryBuilder;
  execute(): Promise<any[]>;
}

export interface IndexDefinition {
  name: string;
  columns: string[];
  unique?: boolean;
  sparse?: boolean;
}

export interface ConstraintDefinition {
  name: string;
  type: 'PRIMARY' | 'UNIQUE' | 'FOREIGN' | 'CHECK';
  columns: string[];
  referencedTable?: string;
  referencedColumns?: string[];
}