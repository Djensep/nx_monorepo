import { Injectable } from '@nestjs/common';
import { UsersRepositoryPort } from '../ports/users.repository.port';
import { PasswordHasherPort } from '../ports/password-hasher.port';
import { LoginUserInput } from '../dtos/login-user.input';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { LoginUserResult } from '../dtos/login-user.result';
import { JwtPort } from '../ports/jwt.port';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly usersRepo: UsersRepositoryPort,
    private readonly hasher: PasswordHasherPort,
    private readonly jwt: JwtPort
  ) {}

  async execute(input: LoginUserInput): Promise<LoginUserResult> {
    const exist = await this.usersRepo.findByEmail(input.email);

    if (!exist) throw new InvalidCredentialsError();

    const isPasswordMatches = await this.hasher.compare(
      input.password,
      exist.getPasswordHash().unwrap()
    );
    const id = exist.getId() ?? 0;

    if (!isPasswordMatches) throw new InvalidCredentialsError();
    const payload = {
      id: id,
    };

    const accessToken = this.jwt.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwt.sign(payload, {
      expiresIn: '7d',
    });

    await this.usersRepo.setRefreshToken(id, refreshToken);

    return {
      user: {
        id,
        email: exist.getEmail(),
        name: exist.getName(),
      },
      accessToken,
      refreshToken,
    };
  }
}
