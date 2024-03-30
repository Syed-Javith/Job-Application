import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobPostDto, EditJobPostDto } from 'src/dto/create-job-post.dto';
import { JobPosting } from 'src/schema/job-post.schema';

@Injectable()
export class JobPostService {
    constructor(@InjectModel('JobPost') private jobPostModel : Model<JobPosting>){}

    async postJobByEmployer(data : CreateJobPostDto){
        const newJobPost = new this.jobPostModel(data);
        return await newJobPost.save();
    }

    async deleteJobPostByEmployer(id : string){
        return await this.jobPostModel.findByIdAndDelete(id);
    }

    async updateJobPostByEmployer(id:string , data : EditJobPostDto){
        return await this.jobPostModel.findByIdAndUpdate(id,data,{ new : true })
    }
}
