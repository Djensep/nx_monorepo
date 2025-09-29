import { User } from '../../domain/entities/user';

export abstract class UsersRepositoryPort {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<void>;
}
