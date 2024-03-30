import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUser, RegisterUser } from 'src/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}
    @Post('/login')
    async login(@Body() data : LoginUser){
     return await this.authService.login(data);
    }

    @Post('/register')
    async register(@Body() data : RegisterUser){
     return await this.authService.register(data)
    }
}
