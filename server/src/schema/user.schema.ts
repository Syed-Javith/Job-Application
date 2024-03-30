import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { WorkExp } from "./workexp.schema";
@Schema()
export class User {
   @Prop({required:true})
   name: string;

   @Prop({required:true})
   email : string;

   @Prop({required:true})
   password : string;
   
   @Prop({required:true})
   gender: string;
   
   @Prop({required:true,default:true})
   isJobSeeker : boolean

   @Prop()
   skills : [string];

   @Prop({length:10,required:true})
   phoneNumber : number

   @Prop({ default:null })
   jobTitle : string | null;

    @Prop({default:null})
    industry :string|null;

    @Prop({default:0,required:true})
    yearsOfExp : number

    @Prop({default:null})
    workHistory : [WorkExp]

    @Prop({ required: true, type: Buffer })
    resume: Buffer;

    @Prop({default:null})
    companyCode : string
}
export const UserSchema = SchemaFactory.createForClass(User);