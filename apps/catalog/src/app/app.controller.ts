import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly PRODUCT_SERVICE: ClientProxy
  ) {}

  @MessagePattern('getData')
  async getData(payload: string) {
    const newPay = payload + 'modified from catalog pattern';
    const res = this.PRODUCT_SERVICE.send('getProduct', newPay);
    return res;
  }
}
