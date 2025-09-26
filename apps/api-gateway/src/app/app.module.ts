import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_CLIENTS } from '../clients.enum';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICE_CLIENTS.CATALOG_SERVICE,
        transport: Transport.TCP,
        options: {
          port: 3003,
        },
      },
      {
        name: MICROSERVICE_CLIENTS.PRODUCTS_SERVICE,
        transport: Transport.TCP,
        options: {
          port: 3004,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
