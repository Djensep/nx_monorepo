// interface/http/controllers/auth.controller.ts
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { toRegisterInput } from '../mappers/http-to-app.mapper';
import { toRegisterResponse } from '../mappers/app-to-http.mapper';
import { EmailAlreadyInUseError } from '../../application/errors/email-already-in-use.error';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { RegisterRequestDto } from '../dtos/register.request.dto';
import { LoginRequestDto } from '../dtos/login.request.dto';
import { LoginUserUseCase } from '../../application/use-cases/login-user.use-case';
import { InvalidCredentialsError } from '../../application/errors/invalid-credentials.error';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUserUseCase
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dtoData: RegisterRequestDto) {
    try {
      const result = await this.registerUser.execute(toRegisterInput(dtoData));
      return toRegisterResponse(result);
    } catch (e) {
      if (e instanceof EmailAlreadyInUseError) {
        throw Object.assign(new Error(e.message), { status: 409 });
      }
      throw e;
    }
  }

  @Post('login')
  async login(@Body() dtoData: LoginRequestDto) {
    try {
      const result = await this.loginUser.execute(dtoData);
      return toRegisterResponse(result);
    } catch (e) {
      if (e instanceof InvalidCredentialsError) {
        throw Object.assign(new Error(e.message), { status: 409 });
      }
      throw e;
    }
  }
}
