import { Kafka, EachMessagePayload } from 'kafkajs';

export type MessageHandler = (p: {
  topic: string;
  key?: string;
  value: any;
  headers?: Record<string, string>;
}) => Promise<void>;

export class KafkaConsumer {
  constructor(
    private readonly kafka: Kafka,
    private readonly topic: string,
    private readonly handler: MessageHandler
  ) {}

  async run(groupId: string) {
    const consumer = this.kafka.consumer({ groupId });
    await consumer.connect();
    await consumer.subscribe({ topic: this.topic, fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ topic, message }: EachMessagePayload) => {
        const valueStr = message.value?.toString() ?? '{}';
        await this.handler({
          topic,
          key: message.key?.toString(),
          value: JSON.parse(valueStr),
          headers: Object.fromEntries(
            Object.entries(message.headers ?? {}).map(([k, v]) => [
              k,
              v?.toString() ?? '',
            ])
          ),
        });
      },
    });
  }
}
