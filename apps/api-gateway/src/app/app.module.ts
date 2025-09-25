import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_CLIENTS } from '../clients.enum';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICE_CLIENTS.ORDERS_SERVICE,
        transport: Transport.TCP,
        options: {
          port: 4001,
        },
      },
      {
        name: MICROSERVICE_CLIENTS.PRODUCTS_SERVICE,
        transport: Transport.TCP,
        options: {
          port: 4002,
        },
      },
      {
        name: MICROSERVICE_CLIENTS.USER_SERVICE,
        transport: Transport.TCP,
        options: {
          port: 4003,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
