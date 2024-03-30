import { Body, Controller, Post } from '@nestjs/common';
import { MlModelService } from './ml-model.service';

@Controller('ml-model')
export class MlModelController {
    constructor(private mlModelService : MlModelService){}

    @Post()
    async predict(@Body() data: any): Promise<any> {
        // Call the service method to feed data to the model and make predictions
        const predictions = await this.mlModelService.predict(data);
        return { predictions };
    }
}
