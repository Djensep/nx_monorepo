import { Module } from '@nestjs/common';
import { AppController } from './modules/interface/controllers/app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_CLIENTS } from './clients.enum';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/infra/datasource/auth.module';
import path from 'path';
import { AccountsModule } from './accounts.module';
import { HealthCheck } from './modules/interface/controllers/healthch.controller';
import { KafkaInfraModule } from './modules/infra/kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '..', '..', '.env'),
    }),
    AuthModule.forRootAsync(),
    AccountsModule,
    KafkaInfraModule.register({
      clientId: 'api-gateway',
      brokers: ['localhost:9092'],
    }),
  ],
  controllers: [AppController, HealthCheck],
  providers: [],
})
export class AppModule {}
