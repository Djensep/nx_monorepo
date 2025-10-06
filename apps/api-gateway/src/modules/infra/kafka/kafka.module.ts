import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { Kafka, logLevel } from 'kafkajs';
import { EventBusPort } from '../../application/ports/event-bus.port';
import { KafkaEventBus } from './kafka.event-bus';

type KafkaConfig = { clientId: string; brokers: string[] };

@Module({})
export class KafkaInfraModule implements OnModuleDestroy {
  static register(cfg: KafkaConfig) {
    const kafkaProvider = {
      provide: Kafka,
      useFactory: () =>
        new Kafka({
          clientId: cfg.clientId,
          brokers: cfg.brokers,
          logLevel: logLevel.NOTHING,
        }),
    };

    const kafkaEventBusProvider = {
      provide: KafkaEventBus,
      useFactory: async (kafka: Kafka) => {
        const bus = new KafkaEventBus(kafka);
        await bus.connect();
        return bus;
      },
      inject: [Kafka],
    };

    const eventBusAlias = {
      provide: EventBusPort,
      useExisting: KafkaEventBus,
    };

    return {
      module: KafkaInfraModule,
      providers: [kafkaProvider, kafkaEventBusProvider, eventBusAlias],
      exports: [EventBusPort],
    };
  }

  constructor(@Inject(KafkaEventBus) private readonly bus: KafkaEventBus) {}

  async onModuleDestroy() {
    await this.bus?.disconnect?.();
  }
}
