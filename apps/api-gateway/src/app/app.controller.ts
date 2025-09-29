import { Controller, Inject, Post } from '@nestjs/common';
import { MICROSERVICE_CLIENTS } from '../clients.enum';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject(MICROSERVICE_CLIENTS.KAFKA_SERVICE)
    private readonly kafkaClient: ClientKafka
  ) {}

  @Post('register')
  async registerUser() {}

  @Post('login')
  async loginUser() {}

  @Post('refresh')
  async refreshToken() {}

  @Post('logout')
  async logoutUser() {}
}
