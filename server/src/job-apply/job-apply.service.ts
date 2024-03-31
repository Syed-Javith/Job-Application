import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobApplicationDto } from 'src/dto/create-job-post.dto';
import { JobPosting } from 'src/schema/job-post.schema';

@Injectable()
export class JobApplyService {
    constructor(@InjectModel('JobPost') private jobModel : Model<JobPosting>){}
    async applyForJob(data : JobApplicationDto){
        const { companyCode } = data;
        return await this.jobModel.updateOne({ companyCode } , { $push : data })
    }
}
