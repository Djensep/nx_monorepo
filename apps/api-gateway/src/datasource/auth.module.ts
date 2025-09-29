import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

@Module({})
export class AuthModule {
  static forRootAsync({
    jwtOptions,
    postgresOptions,
  }: {
    jwtOptions: JwtModuleAsyncOptions;
    postgresOptions: TypeOrmModuleAsyncOptions;
  }): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        TypeOrmModule.forRootAsync(postgresOptions),
        JwtModule.registerAsync(jwtOptions),
      ],
    };
  }
}
