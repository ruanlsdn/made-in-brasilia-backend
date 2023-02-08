import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityService {
  constructor(private readonly openAiService: OpenaiService) {}
  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  async getTextsFromAi(cidade: string) {
    const PROMPT = `
    Siga a seguinte estrutura:\n\n
    titulo:  (conteudo do titulo)\n
    resumo: (conteudo do resumo)\n\n
    e monte um titulo e faça um resumo prolixo da história da cidade ${cidade} - Brasília - DF\n\n
    `;

    return await this.openAiService.getAnswer(PROMPT);
  }
}
