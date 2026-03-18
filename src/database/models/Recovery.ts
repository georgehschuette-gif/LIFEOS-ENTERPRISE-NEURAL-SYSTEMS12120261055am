import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AnomalyRecord } from './Anomaly';

@Entity('recovery_actions')
@Index(['component', 'status', 'createdAt'])
@Index(['type', 'createdAt'])
@Index(['anomalyId'])
export class RecoveryActionRecord {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  anomalyId!: string;

  @Column()
  type!: string; // restart, scale, rollback, replace, isolate, optimize

  @Column()
  component!: string;

  @Column()
  status!: string; // pending, executing, success, partial, failed

  @Column('jsonb')
  parameters!: Record<string, any>;

  @Column('integer')
  estimatedTime!: number;

  @Column('float')
  successProbability!: number;

  @Column('float')
  cost!: number;

  @Column('integer', { default: 0 })
  retries!: number;

  @Column('integer', { default: 3 })
  maxRetries!: number;

  @Column({ nullable: true })
  result?: string; // success, partial, failed

  @Column({ nullable: true })
  details?: string;

  @Column({ nullable: true })
  executedAt?: Date;

  @Column({ nullable: true })
  completedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  deletedAt?: Date;
}