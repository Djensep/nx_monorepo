import { join } from 'path';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from '../modules/entity/users.entity';

config({ path: join(process.cwd(), '.env') });

const configService = new ConfigService();

const ext = __filename.endsWith('.ts') ? 'ts' : 'js';

const options = (): DataSourceOptions => {
  const url = configService.get('DATABASE_URL');
  if (!url) throw new Error('Database url is empty');

  return {
    url,
    type: 'postgres',
    schema: 'public',
    synchronize: true,
    entities: [UserEntity],
    migrations: [join(__dirname, 'migrations', `*.${ext}`)],
    migrationsRun: false,
    migrationsTableName: 'migrations',
  };
};

export const ormConfig: DataSourceOptions = options();
