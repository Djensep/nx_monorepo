import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { MICROSERVICE_CLIENTS } from '../clients.enum';

@Controller()
export class AppController {
  constructor(
    @Inject(MICROSERVICE_CLIENTS.CATALOG_SERVICE)
    private CATALOG_SERVICE: ClientProxy
  ) {}

  @Get()
  getData() {
    const data = this.CATALOG_SERVICE.send(
      'getData',
      'hello world from api gateway'
    );
    console.log('data is ', data);
    return data;
  }
}
