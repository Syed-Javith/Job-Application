import { Injectable, Logger, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUser, RegisterUser } from 'src/dto/create-user.dto';
import { IsUser } from 'src/interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService , @InjectModel('User') private userModel : Model<IsUser>) { }
    async login(data : LoginUser) {
        const { email , password } = data
        const existingUser = await this.userModel.findOne({ email })
        if (!existingUser) {
            throw new NotFoundException("User not found!");
        }
        const isAuth = await bcrypt.compare(password, existingUser.password)
        if (!isAuth) {
            throw new NotAcceptableException("Username , password error");
        }
        return { token: this.jwtService.sign({ email: existingUser.email, _id: existingUser._id }) }
    }

    async register(data : RegisterUser) {
        const { email, password, name, phoneNumber, gender, yearsOfExp , skills , jobTitle , workHistory } = data
        Logger.log(data.password)
        Logger.log(password)
        if (!password) {
            throw new Error('Password is missing');
        }
        const existingUser = await this.userModel.findOne({ email })
        if (existingUser) {
            throw new Error("User already exist")
        }
        const hashPass = await bcrypt.hash(password,10);
        
        const user = await this.userModel.create({
            email,
            password: hashPass,
            name,
            phoneNumber,
            gender,
            yearsOfExp,
            skills,     
            jobTitle,
            workHistory,
        })
        return user
    }
}
