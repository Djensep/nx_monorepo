import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('catalog.getInfo')
  async getInfo(@Payload() dto: any) {
    console.log("got info from catalog' + dto");
    return 'got info from catalog' + dto;
  }
}
