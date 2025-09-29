import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterRequestDto } from '../dtos/register.request.dto';
import { EmailAlreadyInUseError } from '../../application/errors/email-already-in-use.error';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { toRegisterResponse } from '../mappers/app-to-http.mapper';
import { toRegisterInput } from '../mappers/http-to-app.mapper';

@Controller()
export class AppController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterRequestDto) {
    try {
      const result = await this.registerUser.execute(toRegisterInput(dto));
      return toRegisterResponse(result);
    } catch (e) {
      if (e instanceof EmailAlreadyInUseError) {
        throw new HttpException(e.message, HttpStatus.CONFLICT);
      }
      throw e;
    }
  }
}
