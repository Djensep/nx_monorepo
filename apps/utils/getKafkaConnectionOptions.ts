import { ClientOptions, Transport } from '@nestjs/microservices';

export function getKafkaConnectionOptions(
  broker: string | string[],
  clientId: string,
  groupId: string,
  subscribe?: boolean
): ClientOptions {
  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: clientId,
        brokers: Array.isArray(broker) ? broker : [broker],
      },
      consumer: { groupId },
      subscribe: { fromBeginning: subscribe ? true : false },
    },
  };
}
