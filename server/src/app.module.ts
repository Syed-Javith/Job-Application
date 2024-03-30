import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MlModelService } from './ml-model/ml-model.service';
import { MlModelController } from './ml-model/ml-model.controller';
import { MlModelModule } from './ml-model/ml-model.module';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'schema/user.schema';
import { WorkExpSchema } from 'schema/workexp.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MlModelModule,
     AuthModule, 
     JobModule,
     JwtModule.register({secret: 'MY_SECRET_KEY'}),
     MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'job-app'}),
     MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
     MongooseModule.forFeature([{ name: 'WorkExp', schema: WorkExpSchema }])
    ],
  controllers: [AppController, MlModelController],
  providers: [AppService, MlModelService],
})
export class AppModule {}
