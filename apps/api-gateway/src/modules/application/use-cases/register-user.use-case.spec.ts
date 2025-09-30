import { User } from '../../domain/entities/user';
import { PasswordHasherPort } from '../ports/password-hasher.port';
import { UsersRepositoryPort } from '../ports/users.repository.port';
import { RegisterUserUseCase } from './register-user.use-case';

type Mocked<T> = jest.Mocked<T>;

describe('Register new user', () => {
  let usersRepo: Mocked<UsersRepositoryPort>;
  let hasher: Mocked<PasswordHasherPort>;
  let useCase: RegisterUserUseCase;

  beforeEach(() => {
    usersRepo = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    };
    hasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    useCase = new RegisterUserUseCase(usersRepo, hasher);
  });
  it('Should register new user', async () => {
    const input = {
      email: 'TeSt@Example.com',
      name: 'John',
      password: 'hashed_password_123asd',
    };

    const randomId = Math.floor(Math.random() * 100);
    const lowered = input.email.toLowerCase();

    usersRepo.findByEmail.mockResolvedValue(null);

    hasher.hash.mockResolvedValue(input.password);

    let savedUser: User | null = null;

    usersRepo.save.mockImplementation(async (u: User) => {
      savedUser = u;
      return randomId;
    });
    const result = await useCase.execute(input);

    expect(usersRepo.findByEmail).toHaveBeenCalledWith(lowered);
    expect(hasher.hash).toHaveBeenCalledWith(input.password);
    expect(usersRepo.save).toHaveBeenCalledTimes(1);

    expect(savedUser).toBeInstanceOf(User);
    expect(savedUser!.getEmail()).toBe(lowered);

    expect(result).toEqual({
      id: randomId,
      email: lowered,
      name: input.name,
    });
  });
});
