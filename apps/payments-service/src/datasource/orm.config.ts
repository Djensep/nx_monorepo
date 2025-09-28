import { join } from 'path';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { IdempotencyKeyEntity } from '../modules/payment/domain/entities/idempotency-key.entity';
import { OutboxEntity } from '../modules/payment/domain/entities/outbox.entity';
import { PaymentEntity } from '../modules/payment/domain/entities/payment.entity';
import { ProcessedEventEntity } from '../modules/payment/domain/entities/processed-event.entity';

config({ path: join(process.cwd(), '.env') });

const configService = new ConfigService();

const ext = __filename.endsWith('.ts') ? 'ts' : 'js';

const getOptions = (): DataSourceOptions => {
  const url = configService.get('DATABASE_URL');
  if (!url) throw new Error('Database url not found');

  return {
    url,
    type: 'postgres',
    schema: 'public',
    synchronize: true,
    entities: [
      IdempotencyKeyEntity,
      OutboxEntity,
      PaymentEntity,
      ProcessedEventEntity,
    ],
    migrations: [join(__dirname, 'migrations', `*.${ext}`)],
    migrationsRun: false,
    migrationsTableName: 'migrations',
  };
};

export const ormConfig: DataSourceOptions = getOptions();
