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
    return await this.prisma.city.findMany();
  }

  async listAllPaginated(page: number): Promise<City[]> {
    const PAGE_SIZE = 4;
    const skip = page * PAGE_SIZE;

    if (isNaN(skip))
      return await this.prisma.city.findMany({
        orderBy: { name: Prisma.SortOrder.asc },
        take: PAGE_SIZE,
      });

    return await this.prisma.city.findMany({
      orderBy: { name: Prisma.SortOrder.asc },
      skip,
      take: PAGE_SIZE,
    });
  }

  async delete(id: string) {
    await this.prisma.city.delete({
      where: { id },
    });
  }

  async getTextsFromAi(cidade: string) {
    const PROMPT = `
    Siga a seguinte estrutura:\n\n
    1: \n
    2: \n\n
    em 1 coloque um titulo sendo algo similiar a (${cidade} - (alguma caracteristica marcante do local)
    em 2 coloque um resumo prolixo da história da cidade ${cidade} 
    localizada em Brasília no Distrito Federal\n\n
    `;

    return await this.openAiService.getAnswer(PROMPT);
  }
}
