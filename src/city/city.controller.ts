import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { City } from '@prisma/client';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@ApiTags('city')
@Controller('city')
export class CityController {
  constructor(private readonly service: CityService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return await this.service.create(createCityDto);
  }

  @Post('/images/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Body() data: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { cityId } = data;
    const { buffer } = file;
    return await this.service.upload(cityId, buffer);
  }

  @Get('/images/list/:cityId')
  async listAllImages(@Param('cityId') cityId: string) {
    return await this.service.listAllImages(cityId);
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

  @Get('/get-ai-texts/:bairro')
  getTextsFromAi(@Param('bairro') bairro: string) {
    return this.service.getTextsFromAi(bairro);
  }
}
