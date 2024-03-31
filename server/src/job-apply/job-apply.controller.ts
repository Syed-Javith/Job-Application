import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { JobApplyService } from './job-apply.service';
import { JobApplicationDto } from 'src/dto/create-job-post.dto';

@Controller('job-apply')
export class JobApplyController {
    constructor(private jobApplyService : JobApplyService){}
    @Post()
    async applyForJob(@Body() data : JobApplicationDto){
        await this.jobApplyService.applyForJob(data)
    }

    @Get()
    async getMyApplications(@Req() req : Request){
        // const 
    }
}
