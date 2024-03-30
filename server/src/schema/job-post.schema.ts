import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { JobApplication } from "./job-application.schema";

@Schema()
export class JobPosting{
    @Prop({required:true})
    title : string;
    
    @Prop({required:true})
    companyName : string;

    @Prop({required:true})
    companyCode : string

    @Prop({required:true,default:0})
    salary : number

    @Prop({required:true})
    location : string

    @Prop({default:0})
    minExp : number

    @Prop({default:null})
    skillsRequired : string[]

    @Prop({default:null})
    applications : JobApplication[]
}

export const JobPostingSchema = SchemaFactory.createForClass(JobPosting)


