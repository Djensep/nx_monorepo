import { User } from '../../domain/entities/user';
import { PasswordHash } from '../../domain/value-objects/password-hash.vo';
import { UserEntity } from './user.entity';

export class UserMapper {
  static toDomain(row: UserEntity): User {
    return new User(
      row.email,
      row.name,
      PasswordHash.fromHashed(row.passwordHash)
    );
  }

  static toOrm(user: User): UserEntity {
    const orm = new UserEntity();
    orm.email = user.getEmail();
    orm.name = user.getName();
    orm.passwordHash = user.getPasswordHash().unwrap();
    return orm;
  }
}
