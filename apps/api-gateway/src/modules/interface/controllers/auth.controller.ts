// interface/http/controllers/auth.controller.ts
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { toRegisterInput } from '../mappers/http-to-app.mapper';
import { toRegisterResponse } from '../mappers/app-to-http.mapper';
import { EmailAlreadyInUseError } from '../../application/errors/email-already-in-use.error';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { RegisterRequestDto } from '../dtos/register.request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterRequestDto) {
    try {
      const result = await this.registerUser.execute(toRegisterInput(dto));
      return toRegisterResponse(result);
    } catch (e) {
      if (e instanceof EmailAlreadyInUseError) {
        throw Object.assign(new Error(e.message), { status: 409 });
      }
      throw e;
    }
  }
}
