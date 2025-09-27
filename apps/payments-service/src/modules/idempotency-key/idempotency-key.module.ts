import { Module } from '@nestjs/common';
import { IdempotencyKeyService } from './idempotency-key.service';
import { IdempotencyKeyController } from './idempotency-key.controller';

@Module({
  controllers: [IdempotencyKeyController],
  providers: [IdempotencyKeyService],
})
export class IdempotencyKeyModule {}
