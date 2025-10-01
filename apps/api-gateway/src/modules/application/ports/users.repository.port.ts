import { User } from '../../domain/entities/user';

export abstract class UsersRepositoryPort {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<number>;
  abstract findByRToken(token: string): Promise<User | null>;
  abstract logout(userId: number): Promise<null>;
}
