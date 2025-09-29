import { PasswordHash } from '../value-objects/password-hash.vo';

export class User {
  constructor(
    private email: string,
    private name: string,
    private passwordHash: PasswordHash
  ) {}

  static register(params: {
    email: string;
    name: string;
    passwordHash: PasswordHash;
  }): User {
    return new User(params.email, params.name, params.passwordHash);
  }

  getEmail() {
    return this.email;
  }
  getName() {
    return this.name;
  }
  getPasswordHash() {
    return this.passwordHash;
  }
}
