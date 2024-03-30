import { Module } from '@nestjs/common';
import { MlModelService } from './ml-model.service';
import { MlModelController } from './ml-model.controller';

@Module({
  providers: [MlModelService],
  controllers: [MlModelController]
})
export class MlModelModule {}
