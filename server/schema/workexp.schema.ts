import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class WorkExp{
    @Prop({required:true})
    comapany : string;

    @Prop({required:true})
    position:string

    @Prop({required:true})
    startDate : Date

    @Prop()
    endDate : Date | null

}

export const WorkExpSchema = SchemaFactory.createForClass(WorkExp)