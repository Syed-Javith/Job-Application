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

    async getJobById(id: string){
        return await this.jobPostModel.findById(id);
    }

    async getJobs(search : string = null){
        if(search){
            const searchRegex = new RegExp(search, 'i');
            return await this.jobPostModel.find({ $or : [
                { location : searchRegex },
                { companyName : searchRegex },
                { companyCode : searchRegex },
                { title : searchRegex }
            ]},{}, { limit : 20 } )
        }
        return await this.jobPostModel.find({},{},{limit:20});
    }
}
