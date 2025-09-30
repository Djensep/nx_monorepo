import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('health')
export class HealthCheck {
  @Get()
  @HttpCode(200)
  healthCheck() {
    return { message: 200 };
  }
}
