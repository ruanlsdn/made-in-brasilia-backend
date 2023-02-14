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
        max_tokens: 30,
      });

      return this.parseIATextToJson(
        response.data.choices[0].text.replace(/\n/g, '').trim(),
      );
    } catch (error) {
      throw new Error('Something went wrong - ' + error.message);
    }
  }

  parseIATextToJson(IAtext: string) {
    const title = IAtext.substring(3, IAtext.indexOf('2:'));
    const text = IAtext.substring(IAtext.indexOf('2:') + 3, IAtext.length);

    return {
      title: title.trim(),
      text: text.trim(),
    };
  }
}
