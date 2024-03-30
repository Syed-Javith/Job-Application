import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUser, RegisterUser } from 'src/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}
    @Post('/login')
    async login(@Body() data : LoginUser){
      await this.authService.login(data);
    }

    @Post()
    async register(@Body() data : RegisterUser){
      await this.authService.register(data)
    }
}
