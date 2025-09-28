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

  // агрегат к которому относится событие
  @Column('uuid')
  aggregateId!: string;

  // тип события домена например OrderCreated
  @Column({ type: 'varchar' })
  eventType!: string;

  // полезная нагрузка события
  @Column({ type: 'jsonb' })
  payload!: unknown;

  // id для дедупликации сообщений на стороне подписчиков
  @Column({ type: 'varchar', unique: true })
  eventId!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  occurredAt!: Date;

  // когда фоновый паблишер пометил как отправленное
  @Column({ type: 'timestamptz', nullable: true })
  processedAt!: Date | null;
}
