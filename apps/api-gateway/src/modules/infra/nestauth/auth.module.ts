import { Module } from '@nestjs/common';
import type { JwtModuleAsyncOptions } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [],
})
export class AuthModule {
  static forRootAsync({
    jwtOptions,
    postgresOptions,
  }: {
    jwtOptions: JwtModuleAsyncOptions;
    postgresOptions: PostgresModuleAsyncOptions;
  });
}
