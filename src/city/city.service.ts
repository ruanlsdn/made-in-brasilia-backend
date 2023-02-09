import { Injectable } from '@nestjs/common';
import { City, Prisma } from '@prisma/client';
import { OpenaiService } from 'src/openai/openai.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityService {
  constructor(
    private readonly openAiService: OpenaiService,
    private readonly prisma: PrismaService,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    return await this.prisma.city.create({
      data: {
        name: createCityDto.name,
        title: createCityDto.title,
        text: createCityDto.text,
      },
    });
  }

  async update(id: string, updateCityDto: UpdateCityDto) {
    return await this.prisma.city.update({
      where: { id },
      data: {
        name: updateCityDto.name,
        title: updateCityDto.title,
        text: updateCityDto.text,
      },
    });
  }

  async findUnique(id: string): Promise<City> {
    return await this.prisma.city.findUniqueOrThrow({ where: { id } });
  }

  async listAll(): Promise<City[]> {
    return await this.prisma.city.findMany({
      orderBy: { name: Prisma.SortOrder.asc },
    });
  }

  async delete(id: string) {
    await this.findUnique(id);
    await this.prisma.city.delete({
      where: { id },
    });
  }

  async getTextsFromAi(cidade: string) {
    const PROMPT = `
    Siga a seguinte estrutura:\n\n
    titulo:  (conteudo do titulo)\n
    resumo: (conteudo do resumo)\n\n
    e monte um titulo (${cidade} - (alguma caracteristica marcante do local) e faça um resumo prolixo da história da cidade ${cidade} - Brasília - DF\n\n
    `;

    return await this.openAiService.getAnswer(PROMPT);
  }
}
