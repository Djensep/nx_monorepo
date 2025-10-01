import { User } from '../../domain/entities/user';

export abstract class UsersRepositoryPort {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByRToken(token: string): Promise<User | null>;
  abstract save(user: User): Promise<number>;
  abstract logout(userId: number): Promise<null>;
  abstract setRefreshToken(userId: number, refreshToken: string): Promise<void>;
}
