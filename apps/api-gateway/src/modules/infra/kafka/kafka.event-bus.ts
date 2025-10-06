import { Kafka, Producer } from 'kafkajs';
import { EventBusPort } from '../../application/ports/event-bus.port';

export class KafkaEventBus implements EventBusPort {
  private producer: Producer;

  constructor(private readonly kafka: Kafka) {}

  async connect(): Promise<void> {
    this.producer = this.kafka.producer();
    await this.producer.connect();
  }

  async publish<T>(
    topic: string,
    key: string | null,
    payload: T,
    headers?: Record<string, string>
  ): Promise<void> {
    await this.producer.send({
      topic,
      messages: [
        { key: key ?? undefined, value: JSON.stringify(payload), headers },
      ],
    });
  }

  async disconnect(): Promise<void> {
    if (this.producer) await this.producer.disconnect();
  }
}
