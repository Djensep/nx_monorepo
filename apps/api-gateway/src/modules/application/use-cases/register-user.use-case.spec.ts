import { User } from '../../domain/entities/user';
import { PasswordHash } from '../../domain/value-objects/password-hash.vo';
import { EmailAlreadyInUseError } from '../errors/email-already-in-use.error';
import { JwtPort } from '../ports/jwt.port';
import { PasswordHasherPort } from '../ports/password-hasher.port';
import { UsersRepositoryPort } from '../ports/users.repository.port';
import { RegisterUserUseCase } from './register-user.use-case';

type Mocked<T> = jest.Mocked<T>;

describe('Register new user', () => {
  let usersRepo: Mocked<UsersRepositoryPort>;
  let hasher: Mocked<PasswordHasherPort>;
  let useCase: RegisterUserUseCase;
  let jwtPort: Mocked<JwtPort>;

  beforeEach(() => {
    usersRepo = {
      findByEmail: jest.fn(),
      findByRToken: jest.fn(),
      save: jest.fn(),
      logout: jest.fn(),
      setRefreshToken: jest.fn(),
    };
    hasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };
    jwtPort = {
      decode: jest.fn(),
      verify: jest.fn(),
      sign: jest.fn(),
    };

    useCase = new RegisterUserUseCase(usersRepo, hasher, jwtPort);
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

    jwtPort.sign.mockReturnValue('signed_jwt_token');

    const result = await useCase.execute(input);

    expect(usersRepo.findByEmail).toHaveBeenCalledWith(lowered);
    expect(hasher.hash).toHaveBeenCalledWith(input.password);
    expect(usersRepo.save).toHaveBeenCalledTimes(1);
    expect(usersRepo.setRefreshToken).toHaveBeenCalledWith(
      randomId,
      'signed_jwt_token'
    );
    expect(savedUser).toBeInstanceOf(User);
    expect(savedUser!.getEmail()).toBe(lowered);
    expect(jwtPort.sign).toHaveBeenCalledWith(
      { id: randomId },
      { secret: 'SECRET' }
    );

    expect(result).toEqual({
      id: randomId,
      email: lowered,
      name: input.name,
    });
  });

  it('Should throw EmailAlreadyInUseError if email already exist', async () => {
    const input = {
      email: 'TeSt@Example.com',
      name: 'John',
      password: 'hashed_password_123asd',
    };

    const existing = User.register({
      email: input.email.toLowerCase(),
      name: input.name,
      passwordHash: PasswordHash.fromHashed(input.password),
    });

    usersRepo.findByEmail.mockResolvedValue(existing);

    await expect(useCase.execute(input)).rejects.toBeInstanceOf(
      EmailAlreadyInUseError
    );

    expect(hasher.hash).not.toHaveBeenCalled();
    expect(usersRepo.save).not.toHaveBeenCalled();
  });

  it('Should always transform email to lower-case', async () => {
    const input = { email: 'MiXeD@Mail.Com', name: 'N', password: 'p' };
    usersRepo.findByEmail.mockResolvedValue(null);
    hasher.hash.mockResolvedValue('h');
    let savedUser: User | null = null;
    usersRepo.save.mockImplementation(async (u: User) => {
      savedUser = u;
      return Math.floor(Math.random() * 100);
    });

    await useCase.execute(input);

    expect(usersRepo.findByEmail).toHaveBeenCalledWith('mixed@mail.com');
    expect(savedUser!.getEmail()).toBe('mixed@mail.com');
  });
});
