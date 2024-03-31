import { Module } from '@nestjs/common';
import { JobApplyService } from './job-apply.service';
import { JobApplyController } from './job-apply.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobPostingSchema } from 'src/schema/job-post.schema';

@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : 'JobPost' , schema : JobPostingSchema
      }
    ])
  ],
  providers: [JobApplyService],
  controllers: [JobApplyController]
})
export class JobApplyModule {}
