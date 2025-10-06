import { EventBusPort } from '../ports/event-bus.port';

type Input = { orderId: string; userId: string; amount: number };

export class CreateOrderUseCase {
  constructor(private readonly bus: EventBusPort) {}

  async execute(input: Input) {
    await this.bus.publish('orders.created', input.orderId, {
      ...input,
      occurredAt: new Date().toISOString(),
    });
    return { ok: true };
  }
}
