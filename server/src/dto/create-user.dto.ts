import { IsAlpha, IsBase32, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Max, MaxLength } from "class-validator";

export class LoginUser{
    @IsEmail()
    @IsNotEmpty()
    email : string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password : string
}

export class WorkHistory{
    @IsString()
    comapany : string;

    position:string;

    @IsDate()
    startDate : Date
    
    endDate : Date | null
}

export class RegisterUser extends LoginUser{
    @IsString()
    @IsAlpha()
    @MaxLength(20)
    name : string

    @IsNumber()
    @MaxLength(10)
    phoneNumber : number

    @IsString()
    @IsAlpha()
    gender : string

    @IsNumber()
    @Max(100)
    yearsOfExp : number

    @IsBoolean()
    isJobSeeker : boolean;

    skills : String[] | null 

    jobTitle : string | null

    workHistory : WorkHistory[]

    @IsBase32()
    resume: Buffer;
}