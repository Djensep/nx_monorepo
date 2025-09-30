import { Injectable } from '@nestjs/common';
import { UsersRepositoryPort } from '../ports/users.repository.port';
import { PasswordHasherPort } from '../ports/password-hasher.port';
import { LoginUserInput } from '../dtos/login-user.input';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { LoginUserResult } from '../dtos/login-user.result';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly usersRepo: UsersRepositoryPort,
    private readonly hasher: PasswordHasherPort
  ) {}

  async execute(input: LoginUserInput): Promise<LoginUserResult> {
    const exist = await this.usersRepo.findByEmail(input.email);

    if (!exist) throw new InvalidCredentialsError();

    const isPasswordMatches = await this.hasher.compare(
      input.password,
      exist.getPasswordHash().unwrap()
    );
    if (!isPasswordMatches) throw new InvalidCredentialsError();
    const id = exist.getId() ?? 0;
    return {
      user: {
        id,
        email: exist.getEmail(),
        name: exist.getName(),
      },
      accessToken: '',
    };
  }
}
