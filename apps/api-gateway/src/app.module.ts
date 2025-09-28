import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_CLIENTS } from './clients.enum';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule,
    ClientsModule.register([
      {
        name: MICROSERVICE_CLIENTS.KAFKA_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
