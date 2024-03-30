import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MlModelService } from './ml-model/ml-model.service';
import { MlModelController } from './ml-model/ml-model.controller';
import { MlModelModule } from './ml-model/ml-model.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWTMiddleware } from './middleware/JWT.middlware';
import { UserSchema } from './schema/user.schema';
import { WorkExpSchema } from './schema/workexp.schema';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JobPostModule } from './job-post/job-post.module';
import { JobApplyModule } from './job-apply/job-apply.module';
import { MessageModule } from './message/message.module';
import { MulterModule } from '@nestjs/platform-express';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    MlModelModule,
    AuthModule,
    JwtModule.register({ secret: 'MY_SECRET_KEY' }),
    MongooseModule.forRoot('mongodb://localhost:27017/job-db'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'WorkExp', schema: WorkExpSchema }]),
    JobPostModule,
    JobApplyModule,
    MessageModule,
    MulterModule.register({
      dest: './uploads',
    }),
    NotifyModule,
  ],
  controllers: [AppController, MlModelController, AuthController],
  providers: [AppService, MlModelService, AuthService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(JWTMiddleware).exclude('/auth/*').forRoutes('*');
  // }
}
