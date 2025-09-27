import { Module } from '@nestjs/common';
import { ProcessedEventService } from './processed-event.service';
import { ProcessedEventController } from './processed-event.controller';

@Module({
  controllers: [ProcessedEventController],
  providers: [ProcessedEventService],
})
export class ProcessedEventModule {}
