import { User } from '../../domain/entities/user';
import { PasswordHash } from '../../domain/value-objects/password-hash.vo';
import { JwtPort } from '../ports/jwt.port';
import { PasswordHasherPort } from '../ports/password-hasher.port';
import { UsersRepositoryPort } from '../ports/users.repository.port';
import { LoginUserUseCase } from './login-user.use-case';

type Mocked<T> = jest.Mocked<T>;

describe('login user use case', () => {
  let usersRepo: Mocked<UsersRepositoryPort>;
  let hasher: Mocked<PasswordHasherPort>;
  let jwtPort: Mocked<JwtPort>;
  let useCase: LoginUserUseCase;

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

    useCase = new LoginUserUseCase(usersRepo, hasher, jwtPort);
  });

  it('Should successfully login user', async () => {
    const input = {
      email: 'leedjensep@gmail.com',
      password: 'fakerPassword',
    };

    const randomId = Math.floor(Math.random() * 100);

    const user = User.register({
      id: randomId,
      email: input.email,
      name: 'Test',
      passwordHash: PasswordHash.fromHashed(
        '553ae7da92f5505a92bbb8c9d47be76ab9f65bc2'
      ),
    });
    hasher.compare.mockResolvedValue(true);

    usersRepo.findByEmail.mockResolvedValue(user);
    jwtPort.sign
      .mockReturnValueOnce('accessToken')
      .mockReturnValueOnce('refreshToken');

    const result = await useCase.execute(input);

    expect(usersRepo.findByEmail).toHaveBeenCalledWith(input.email);
    expect(hasher.compare).toHaveBeenCalledWith(
      input.password,
      '553ae7da92f5505a92bbb8c9d47be76ab9f65bc2'
    );

    expect(jwtPort.sign).toHaveBeenCalledWith(
      { id: randomId },
      expect.objectContaining({ expiresIn: '15m' })
    );
    expect(jwtPort.sign).toHaveBeenCalledWith(
      { id: randomId },
      expect.objectContaining({ expiresIn: '7d' })
    );

    expect(usersRepo.setRefreshToken).toHaveBeenCalledWith(
      randomId,
      'signed_token'
    );
    expect(result).toEqual({
      id: randomId,
      email: input.email,
      name: 'Test',
    });
  });
});
