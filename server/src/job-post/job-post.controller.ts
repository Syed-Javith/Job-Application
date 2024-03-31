import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JobPostService } from './job-post.service';
import { CreateJobPostDto, EditJobPostDto } from 'src/dto/create-job-post.dto';

@Controller('job-post')
export class JobPostController {
    constructor(private jobPostService : JobPostService){}

    @Get()
    async getJobPosts(@Query('search') search : string){
        return await this.jobPostService.getJobs(search || null)
    }

    @Get('/:id')
    async getJobById(@Param('id') id : string){
        return await this.jobPostService.getJobById(id)
    }

    @Post()
    async createJobPost(@Body() data : CreateJobPostDto){
        return await this.jobPostService.postJobByEmployer(data)
    }

    @Delete('/:id')
    async deleteJobPost(@Param('id') id : string){
        return await this.jobPostService.deleteJobPostByEmployer(id)
    }

    @Patch('/:id')
    async updateJobPost(@Param('id') id :string , @Body() data : EditJobPostDto){
       return await this.jobPostService.updateJobPostByEmployer(id,data)
    }
}
