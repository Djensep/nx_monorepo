import { Injectable } from '@nestjs/common';
import { EmailAlreadyInUseError } from '../errors/email-already-in-use.error';
import { User } from '../../domain/entities/user';
import { PasswordHash } from '../../domain/value-objects/password-hash.vo';
import { RegisterUserInput } from '../dtos/register-user.input';
import { RegisterUserResult } from '../dtos/register-user.result';
import { UsersRepositoryPort } from '../ports/users.repository.port';
import { PasswordHasherPort } from '../ports/password-hasher.port';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly usersRepo: UsersRepositoryPort,
    private readonly hasher: PasswordHasherPort
  ) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserResult> {
    const existing = await this.usersRepo.findByEmail(
      input.email.toLowerCase()
    );
    if (existing) throw new EmailAlreadyInUseError();

    const hash = await this.hasher.hash(input.password);
    const user = User.register({
      email: input.email.toLowerCase(),
      name: input.name,
      passwordHash: PasswordHash.fromHashed(hash),
    });

    const id = await this.usersRepo.save(user);

    return {
      user: { id, email: user.getEmail(), name: user.getName() },
      accessToken: '',
    };
  }
}
