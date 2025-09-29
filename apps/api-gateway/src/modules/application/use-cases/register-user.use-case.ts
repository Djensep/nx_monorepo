import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
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
      id: randomUUID(),
      email: input.email.toLowerCase(),
      name: input.name,
      passwordHash: PasswordHash.fromHashed(hash),
    });

    await this.usersRepo.save(user);

    return { id: user.getId(), email: user.getEmail(), name: user.getName() };
  }
}
