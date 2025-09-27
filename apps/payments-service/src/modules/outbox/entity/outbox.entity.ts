import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'outbox' })
@Index(['processedAt', 'occurredAt'])
export class OutboxEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  aggregateId!: string;

  @Column({ type: 'varchar', unique: true })
  eventId!: string;

  @Column({ type: 'varchar' })
  eventType!: string;

  @Column({ type: 'jsonb' })
  payload!: unknown;

  @CreateDateColumn({ type: 'timestamptz' })
  occurredAt!: Date;

  @Column({ type: 'timestamptz', nullable: true })
  processedAt!: Date | null;
}
