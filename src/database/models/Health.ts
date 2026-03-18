import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('health_checks')
@Index(['componentName', 'createdAt'])
@Index(['status', 'createdAt'])
export class HealthCheck {
  @PrimaryGeneratedColumn('uuid')
  id! : string;

  @Column()
  componentName!: string;

  @Column()
  componentType!: string;

  @Column()
  status!: string; // healthy, degraded, unhealthy, failed

  @Column('float')
  latency!: number;

  @Column('float')
  errorRate!: number;

  @Column('float')
  availability!: number;

  @Column('jsonb', { nullable: true })
  details?: Record<string, any>;

  @Column({ nullable: true })
  error?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  deletedAt?: Date;
}

@Entity('health_metrics')
@Index(['componentName', 'timestamp'])
export class HealthMetrics {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  componentName!: string;

  @Column('float')
  uptime!: number;

  @Column('float')
  downtime!: number;

  @Column('integer')
  checkCount!: number;

  @Column('integer')
  failureCount!: number;

  @Column('float')
  averageLatency!: number;

  @Column('float')
  minLatency!: number;

  @Column('float')
  maxLatency!: number;

  @Column('float')
  p95Latency!: number;

  @Column('float')
  p99Latency!:  number;

  @CreateDateColumn()
  timestamp!: Date;
}