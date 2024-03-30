import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class JobApplicationDto {
    @IsNotEmpty()
    userId: string; 
  
    @IsNotEmpty()
    @IsString()
    companyCode: string;
  
    @IsNotEmpty()
    postingId: string; 
  
    appliedDate?: Date;
}

export class CreateJobPostDto{
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsNotEmpty()
    @IsString()
    companyName: string;
  
    @IsNotEmpty()
    @IsString()
    companyCode: string;
  
    @IsOptional()
    @IsNumber()
    salary?: number;
  
    @IsNotEmpty()
    @IsString()
    location: string;
  
    @IsOptional()
    @IsNumber()
    minExp?: number;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    skillsRequired?: string[];
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => JobApplicationDto)
    applications?: JobApplicationDto[];
}

export class EditJobPostDto extends PartialType(CreateJobPostDto){}