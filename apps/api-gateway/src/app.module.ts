import { Module } from '@nestjs/common';
import { AppController } from './modules/app/app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_CLIENTS } from './clients.enum';
import { ConfigModule } from '@nestjs/config';
import { HealthCheck } from './modules/healthch/healthch.controller';
import { AuthModule } from './modules/infra/datasource/auth.module';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '..', '..', '.env'),
    }),
    AuthModule.forRootAsync(),
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
  controllers: [AppController, HealthCheck],
  providers: [],
})
export class AppModule {}
