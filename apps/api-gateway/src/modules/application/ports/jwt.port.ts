import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

export abstract class JwtPort {
  abstract sign(
    payload: string | Buffer | object,
    options?: JwtSignOptions
  ): string;

  abstract verify<T extends object = Record<string, unknown>>(
    token: string,
    options?: JwtVerifyOptions
  ): T;

  abstract decode(
    token: string,
    options?: JwtVerifyOptions
  ): null | { id: number } | string;
}
