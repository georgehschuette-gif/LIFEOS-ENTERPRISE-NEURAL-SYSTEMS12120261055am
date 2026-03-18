import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('anomalies')
@Index(['component', 'severity', 'createdAt'])
@Index(['type', 'createdAt'])
export class AnomalyRecord {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  component!: string;

  @Column()
  type!: string; // performance, security, availability, data, model

  @Column()
  severity!: string; // low, medium, high, critical

  @Column()
  description!: string;

  @Column('float')
  impact!: number;

  @Column('float')
  confidence!: number;

  @Column({ nullable: true })
  rootCause?: string;

  @Column({ nullable: true })
  affectedSessions?: number;

  @Column('float', { nullable: true })
  estimatedDamage?: number;

  @Column('jsonb', { nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  detectedAt!: Date;

  @Column({ nullable: true })
  resolvedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}