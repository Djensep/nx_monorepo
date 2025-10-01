import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordHasherPort } from './modules/application/ports/password-hasher.port';
import { UsersRepositoryPort } from './modules/application/ports/users.repository.port';
import { RegisterUserUseCase } from './modules/application/use-cases/register-user.use-case';
import { UsersRepository } from './modules/infra/persistence/users.repository';
import { BcryptPasswordHasher } from './modules/infra/security/bcrypt.password-hasher';
import { UserEntity } from './modules/infra/persistence/user.entity';
import { AuthController } from './modules/interface/controllers/auth.controller';
import { LoginUserUseCase } from './modules/application/use-cases/login-user.use-case';
import { LogoutUserUseCase } from './modules/application/use-cases/logout-use.use-case';
import { JwtPort } from './modules/application/ports/jwt.port';
import { JwtAdapter } from './modules/infra/security/jwt.adapter';

const providers = [
  RegisterUserUseCase,
  LoginUserUseCase,
  LogoutUserUseCase,
  { provide: UsersRepositoryPort, useClass: UsersRepository },
  { provide: PasswordHasherPort, useClass: BcryptPasswordHasher },
  { provide: JwtPort, useClass: JwtAdapter },
];

const exportProviders = [
  RegisterUserUseCase,
  LoginUserUseCase,
  LogoutUserUseCase,
  { provide: UsersRepositoryPort, useClass: UsersRepository },
  { provide: JwtPort, useClass: JwtAdapter },
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [...providers],
  exports: [...exportProviders],
})
export class AccountsModule {}
