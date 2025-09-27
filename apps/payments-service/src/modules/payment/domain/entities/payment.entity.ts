import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentStatus } from '../enums/payment-status.enum';

@Entity({ name: 'payments' })
@Index(['orderId'], { unique: true })
@Index(['status', 'createdAt'])
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  orderId!: string;

  @Column({ type: 'integer' })
  amountCents!: number;

  @Column({ type: 'char', length: 3 })
  currency!: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.INITIATED,
  })
  status!: PaymentStatus;

  @Column({ type: 'varchar', nullable: true })
  providerTxId!: string | null;

  @Column({ type: 'varchar', nullable: true })
  errorCode!: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
