import { join } from 'path';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { OrderEntity } from '../modules/orders/domain/entities/order.entity';
import { OutboxEntity } from '../modules/orders/domain/entities/outbox.entity';
import { ProcessedEventEntity } from '../modules/orders/domain/entities/processed-event.entity';

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
    entities: [OrderEntity, OutboxEntity, ProcessedEventEntity],
    migrations: [join(__dirname, 'migrations', `*.${ext}`)],
    migrationsRun: false,
    migrationsTableName: 'migrations',
  };
};

export const ormConfig: DataSourceOptions = getOptions();
