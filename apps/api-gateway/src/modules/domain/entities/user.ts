import { PasswordHash } from '../value-objects/password-hash.vo';

export class User {
  constructor(
    private email: string,
    private name: string,
    private passwordHash: PasswordHash,
    private id?: number,
    private refreshToken?: string
  ) {}

  static register(params: {
    email: string;
    name: string;
    passwordHash: PasswordHash;
    id?: number;
  }): User {
    return new User(params.email, params.name, params.passwordHash);
  }

  getRefreshToken() {
    return this.refreshToken;
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
