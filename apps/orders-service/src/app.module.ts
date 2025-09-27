import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        url: configService.get('DATABASE_URL'),
        type: 'postgres',
        schema: 'public',
        synchronize: true,
        entities: [join(__dirname, '..', '..', '**', '*.entity.{ts,js}')],
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
