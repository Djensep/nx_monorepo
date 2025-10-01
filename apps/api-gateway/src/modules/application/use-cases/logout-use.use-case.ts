import { Injectable } from '@nestjs/common';
import { UsersRepositoryPort } from '../ports/users.repository.port';
import { JwtPort } from '../ports/jwt.port';
import { InvalidToken } from '../errors/invalid-token.error';

@Injectable()
export class LogoutUserUseCase {
  constructor(
    private readonly usersRepo: UsersRepositoryPort,
    private readonly jwt: JwtPort
  ) {}

  async execute(refreshToken: string) {
    const tokenData = this.jwt.decode(refreshToken);
    if (!tokenData || typeof tokenData === 'string') throw new InvalidToken();

    await this.usersRepo.logout(tokenData.id);
  }
}
