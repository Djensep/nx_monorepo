import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'idempotency_keys' })
export class IdempotencyKey {
  // ключ из заголовка Idempotency-Key
  @PrimaryColumn({ type: 'varchar' })
  key!: string;

  @Column('uuid')
  orderId!: string;

  // сериализованный ответ чтобы возвращать тот же результат
  @Column({ type: 'jsonb' })
  response!: unknown;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  // soft TTL можно проверять приложением или очисткой по расписанию
  @Column({ type: 'timestamptz' })
  ttlAt!: Date;
}
