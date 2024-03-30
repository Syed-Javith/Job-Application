import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

@Schema()
export class JobApplication{
    @Prop({required:true})
    userId : ObjectId;

    @Prop({required:true})
    companyCode : string

    @Prop({required:true})
    postingId : ObjectId

    @Prop({ default: Date.now() })
    appliedDate : Date
}

export const JobApplicationSchema = SchemaFactory.createForClass(JobApplication)