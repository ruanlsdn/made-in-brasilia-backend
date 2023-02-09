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
        max_tokens: 50,
      });

      return this.parseIATextToJson(
        response.data.choices[0].text.replace(/\n/g, ''),
      );
    } catch (error) {
      throw new Error('Something went wrong - ' + error.message);
    }
  }

  parseIATextToJson(IAtext: string) {
    const title = IAtext.substring(0, IAtext.indexOf('Resumo'));
    const text = IAtext.substring(title.length);

    return {
      title: title.substring('Titulo:'.length + 1).trim(),
      text: text.substring('Resumo:'.length).trim(),
    };
  }
}
