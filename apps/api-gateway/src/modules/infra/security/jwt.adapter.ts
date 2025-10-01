import { Injectable } from '@nestjs/common';
import { JwtPort } from '../../application/ports/jwt.port';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

@Injectable()
export class JwtAdapter implements JwtPort {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: Buffer | object, options?: JwtSignOptions): string {
    return this.jwtService.sign(payload, options);
  }

  verify<T extends object = Record<string, unknown>>(
    token: string,
    options?: JwtVerifyOptions
  ): T {
    return this.jwtService.verify(token, options);
  }

  decode(
    token: string,
    options?: JwtVerifyOptions
  ): null | { id: number } | string {
    return this.jwtService.decode(token, options);
  }
}
