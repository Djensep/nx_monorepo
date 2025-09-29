import { PasswordHash } from '../value-objects/password-hash.vo';

export class User {
  constructor(
    private readonly id: string,
    private email: string,
    private name: string,
    private passwordHash: PasswordHash
  ) {}

  static register(params: {
    id: string;
    email: string;
    name: string;
    passwordHash: PasswordHash;
  }): User {
    return new User(params.id, params.email, params.name, params.passwordHash);
  }

  getId() {
    return this.id;
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
