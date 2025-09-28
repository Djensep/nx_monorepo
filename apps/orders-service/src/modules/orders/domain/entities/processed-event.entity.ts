import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'processed_events' })
export class ProcessedEventEntity {
  @PrimaryColumn({ type: 'varchar' })
  eventId!: string;

  @Column({ type: 'varchar' })
  eventType!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  processedAt!: Date;
}
