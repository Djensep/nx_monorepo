import { Body, Controller, Inject, Post } from '@nestjs/common';
import { MICROSERVICE_CLIENTS } from '../../../clients.enum';
import { ClientKafka } from '@nestjs/microservices';
import { RegisterUserDto } from '../dtos/register-user.dto';

@Controller()
export class AppController {
  constructor(
    @Inject(MICROSERVICE_CLIENTS.KAFKA_SERVICE)
    private readonly kafkaClient: ClientKafka
  ) {}

  @Post('register')
  async registerUser(@Body() dtoData: RegisterUserDto) {}

  @Post('login')
  async loginUser() {}

  @Post('refresh')
  async refreshToken() {}

  @Post('logout')
  async logoutUser() {}
}
