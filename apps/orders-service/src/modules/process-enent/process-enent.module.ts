import { Module } from '@nestjs/common';
import { ProcessEnentService } from './process-enent.service';
import { ProcessEnentController } from './process-enent.controller';

@Module({
  controllers: [ProcessEnentController],
  providers: [ProcessEnentService],
})
export class ProcessEnentModule {}
