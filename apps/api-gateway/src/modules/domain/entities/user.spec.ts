import { User } from './user';
import { PasswordHash } from '../value-objects/password-hash.vo';
describe('User domain entity', () => {
  it('should create a User using the static register method', () => {
    const email = 'test@example.com';
    const name = 'John Doe';
    const passwordHash = PasswordHash.fromHashed('hashed_password_123asd');

    const user = User.register({ email, name, passwordHash });

    expect(user).toBeInstanceOf(User);
    expect(user.getEmail()).toBe(email);
    expect(user.getName()).toBe(name);
    expect(user.getPasswordHash()).toBe(passwordHash);
  });
});
