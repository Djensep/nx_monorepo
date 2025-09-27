import { Controller } from '@nestjs/common';
import { IdempotencyKeyService } from './idempotency-key.service';

@Controller('idempotency-key')
export class IdempotencyKeyController {
  constructor(private readonly idempotencyKeyService: IdempotencyKeyService) {}
}
