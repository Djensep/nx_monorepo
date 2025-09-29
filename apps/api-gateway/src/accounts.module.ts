import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordHasherPort } from './modules/application/ports/password-hasher.port';
import { UsersRepositoryPort } from './modules/application/ports/users.repository.port';
import { RegisterUserUseCase } from './modules/application/use-cases/register-user.use-case';
import { UsersRepository } from './modules/infra/persistence/users.repository';
import { BcryptPasswordHasher } from './modules/infra/security/bcrypt.password-hasher';
import { UserEntity } from './modules/infra/persistence/user.entity';
import { AuthController } from './modules/interface/controllers/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [
    RegisterUserUseCase,
    { provide: UsersRepositoryPort, useClass: UsersRepository },
    { provide: PasswordHasherPort, useClass: BcryptPasswordHasher },
  ],
  exports: [
    RegisterUserUseCase,
    { provide: UsersRepositoryPort, useClass: UsersRepository },
  ],
})
export class AccountsModule {}
