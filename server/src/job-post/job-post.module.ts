import { Module } from '@nestjs/common';
import { JobPostService } from './job-post.service';
import { JobPostController } from './job-post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobPostingSchema } from 'src/schema/job-post.schema';

@Module({
  imports : [
    MongooseModule.forFeature([
      { name : 'JobPost' , schema : JobPostingSchema }
    ])
  ],
  providers: [JobPostService,],
  controllers: [JobPostController]
})
export class JobPostModule {}
