import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { toRegisterInput } from '../mappers/http-to-app.mapper';
import { toRegisterResponse } from '../mappers/app-to-http.mapper';
import { EmailAlreadyInUseError } from '../../application/errors/email-already-in-use.error';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { RegisterRequestDto } from '../dtos/register.request.dto';
import { LoginRequestDto } from '../dtos/login.request.dto';
import { LoginUserUseCase } from '../../application/use-cases/login-user.use-case';
import { InvalidCredentialsError } from '../../application/errors/invalid-credentials.error';
import type { Request, Response } from 'express';
import { LogoutUserUseCase } from '../../application/use-cases/logout-use.use-case';
import { InvalidToken } from '../../application/errors/invalid-token.error';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUserUseCase,
    private readonly logoutUser: LogoutUserUseCase
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() dtoData: RegisterRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const { refreshToken, ...restData } = await this.registerUser.execute(
        toRegisterInput(dtoData)
      );
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });

      return toRegisterResponse(restData);
    } catch (e) {
      if (e instanceof EmailAlreadyInUseError) {
        throw Object.assign(new Error(e.message), { status: 409 });
      }
      throw e;
    }
  }

  @Post('login')
  async login(
    @Body() dtoData: LoginRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const { refreshToken, ...restData } = await this.loginUser.execute(
        dtoData
      );
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });
      return toRegisterResponse(restData);
    } catch (e) {
      if (e instanceof InvalidCredentialsError) {
        throw Object.assign(new Error(e.message), { status: 409 });
      }
      throw e;
    }
  }

  @Get('logout')
  @HttpCode(200)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const token = req.cookies.refreshToken;
      await this.logoutUser.execute(token);
      res.clearCookie('refreshToken');
    } catch (e) {
      if (e instanceof InvalidToken) {
        throw Object.assign(new Error(e.message), { status: 409 });
      }
      throw e;
    }
  }
}
