import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';

@Controller('orders')
export class OrderController {
  constructor(private readonly createOrder: CreateOrderUseCase) {}

  @Post()
  create(@Body() dto: { orderId: string; userId: string; amount: number }) {
    return this.createOrder.execute(dto);
  }
}
