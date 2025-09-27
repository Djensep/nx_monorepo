import { Controller } from '@nestjs/common';
import { ProcessedEventService } from './processed-event.service';

@Controller('processed-event')
export class ProcessedEventController {
  constructor(private readonly processedEventService: ProcessedEventService) {}
}
