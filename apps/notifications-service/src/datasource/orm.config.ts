import { join } from 'path';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm/browser';

config({ path: join(process.cwd(), '.env') });

const configService = new ConfigService();

const options = (): DataSourceOptions => {
  const url = configService.get('DATABASE_URL');
  if (!url) throw new Error('Database url not found');

  return {
    url,
    type: 'postgres',
    schema: 'public',
    synchronize: true,
    entities: [join(__dirname, '..', '..', '**', '*.entity.{ts,js}')],
    migrations: [join(__dirname, '..', '..', '..', 'migrations', '*.{ts,js}')],
    migrationsRun: false,
    migrationsTableName: 'migrations',
  };
};

export const ormConfig = new DataSource(options());
