import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

const DEFAULT_MODEL: string = 'text-davinci-003';
const DEFAULT_TEMPERATURE: number = 0.9;

@Injectable()
export class OpenaiService {
  private readonly api: OpenAIApi;

  constructor() {
    const CONFIGURATION = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.api = new OpenAIApi(CONFIGURATION);
  }

  async getAnswer(message: string) {
    try {
      const response = await this.api.createCompletion({
        prompt: message,
        model: DEFAULT_MODEL,
        temperature: DEFAULT_TEMPERATURE,
        max_tokens: 512,
      });

      console.log(response.data);

      return response.data.choices[0].text;
    } catch (error) {
      throw new Error('Something went wrong - ' + error.message);
    }
  }
}
