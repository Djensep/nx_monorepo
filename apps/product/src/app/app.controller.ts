import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('getProduct')
  getData(payload: string) {
    const newPayload = payload + 'product modified';

    return newPayload;
  }
}
