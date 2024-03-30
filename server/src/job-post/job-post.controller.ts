import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { JobPostService } from './job-post.service';
import { CreateJobPostDto, EditJobPostDto } from 'src/dto/create-job-post.dto';

@Controller('job-post')
export class JobPostController {
    constructor(private jobPostService : JobPostService){}

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
