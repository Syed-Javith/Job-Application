import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'schema/user.schema';
import bcrypt from 'bcrypt'
import { LoginUser, RegisterUser } from 'src/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, @InjectModel('user') private readonly userModel: Model<User>) { }
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
        const existingUser = await this.userModel.findOne({ email })
        if (existingUser) {
            throw new Error("User already exist")
        }
        const hash = await bcrypt.hash(password, 10);
        const user = this.userModel.create({
            email,
            password: hash,
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
