import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { MICROSERVICE_CLIENTS } from '../clients.enum';
import { ClientKafka } from '@nestjs/microservices';
import { catchError, lastValueFrom, timeout } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject(MICROSERVICE_CLIENTS.KAFKA_SERVICE)
    private readonly kafkaClient: ClientKafka
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('catalog.getInfo');
    await this.kafkaClient.connect();
  }

  onModuleDestroy() {
    this.kafkaClient.close();
  }

  @Post('order')
  createOrder(@Body() order: any) {
    console.log('api gateway sent kafka message');
    this.kafkaClient.emit('order.created', order);
  }

  @Get()
  async getInfo() {
    const res = this.kafkaClient.send('catalog.getInfo', 'hello').pipe(
      timeout(5000),
      catchError((e) => {
        throw e;
      })
    );
    console.log('res =====', await lastValueFrom(res));
  }
}
