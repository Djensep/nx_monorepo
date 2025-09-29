import { join } from 'path';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { NotificationEntity } from '../modules/notifications/domain/entities/notification.entity';
import { OutboxEntity } from '../modules/notifications/domain/entities/outbox.entity';
import { PreferencesEntity } from '../modules/notifications/domain/entities/preferences.entity';

const getOptions = (): DataSourceOptions => {
  config({
    path: join(process.cwd(), '..', '.env'),
  });

  const configService = new ConfigService();

  const ext = __filename.endsWith('.ts') ? 'ts' : 'js';
  const url = configService.get('DATABASE_URL');
  if (!url) throw new Error('Database url not found');

  return {
    url,
    type: 'postgres',
    schema: 'public',
    synchronize: true,
    entities: [NotificationEntity, OutboxEntity, PreferencesEntity],
    migrations: [join(__dirname, 'migrations', `*.${ext}`)],
    migrationsRun: false,
    migrationsTableName: 'migrations',
  };
};

export const ormConfig: DataSourceOptions = getOptions();
