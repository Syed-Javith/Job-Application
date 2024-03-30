import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MlModelService {
  async predict(inputData: any): Promise<number[]> {
    try {
      // Send POST request to Flask endpoint with input data
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        feature: inputData.feature  // Adjust this according to your data structure
      });
      
      // Extract prediction from the response and return it
      return response.data.prediction;
    } catch (error) {
      // Handle errors
      console.error('Error:', error.response.data);
      throw new Error('Failed to make prediction.');
    }
  }
}
