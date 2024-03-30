import { Module } from '@nestjs/common';
import { JobApplyService } from './job-apply.service';
import { JobApplyController } from './job-apply.controller';

@Module({
  providers: [JobApplyService],
  controllers: [JobApplyController]
})
export class JobApplyModule {}
