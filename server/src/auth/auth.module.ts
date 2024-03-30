import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
// import { User } from 'src/schema/user.schema';

@Module({
  imports : [
    JwtModule.register({ secret: 'MY_SECRET_KEY' }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
   ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, User ]
})
export class AuthModule {}
