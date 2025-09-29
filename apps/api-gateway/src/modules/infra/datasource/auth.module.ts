import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/entities/users.entity';

@Module({})
export class AuthModule {
  static forRootAsync(): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            url: config.get('DATABASE_URL'),
            type: 'postgres',
            schema: 'public',
            entities: [UserEntity],
            synchronize: true,
          }),
        }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            secret: config.get<string>('JWT_SECRET'),
            signOptions: {
              expiresIn: config.get<string>('JWT_EXPIRES_IN') ?? '1h',
            },
          }),
        }),
      ],
    };
  }
}
