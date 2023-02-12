import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Post,
  Put,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { City } from '@prisma/client';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

// TODO: Verificar uma maneira de carregar imagens para o banco ou para a aplicação.
@ApiTags('city')
@Controller('city')
export class CityController {
  constructor(private readonly service: CityService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return await this.service.create(createCityDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCityDto: UpdateCityDto,
  ): Promise<City> {
    return await this.service.update(id, updateCityDto);
  }

  @Get()
  async listAll(): Promise<City[]> {
    return await this.service.listAll();
  }

  @ApiQuery({ name: 'page', required: false })
  @Get('/paginated')
  async listAllPaginated(@Query('page') page: number): Promise<City[]> {
    return await this.service.listAllPaginated(page);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.service.delete(id);
  }

  @Get('/get-ai-texts/:cidade')
  getTextsFromAi(@Param('cidade') cidade: string) {
    return this.service.getTextsFromAi(cidade);
  }
}
