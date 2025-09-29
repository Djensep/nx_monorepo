import { User } from '../../domain/entities/user';

export interface UsersRepositoryPort {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
