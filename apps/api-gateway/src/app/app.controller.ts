import { Controller, Inject } from '@nestjs/common';
import { MICROSERVICE_CLIENTS } from '../clients.enum';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject(MICROSERVICE_CLIENTS.KAFKA_SERVICE)
    private readonly kafkaClient: ClientKafka
  ) {}
}
