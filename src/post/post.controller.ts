import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Post as Posts } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

// TODO: Adicionar relacionamento entre Post e User quando tiver um módulo de login na aplicação.
@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<Posts> {
    return await this.service.create(createPostDto);
  }

  @Post('/images/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Body() data: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { postId } = data;
    const { buffer } = file;
    return await this.service.upload(postId, buffer);
  }

  @Get('/images/list')
  async listAllImages() {
    return await this.service.listAllImages();
  }

  @ApiQuery({ name: 'cityId', required: false })
  @ApiQuery({ name: 'page', required: false })
  @Get()
  async listAll(
    @Query('cityId') cityId: string,
    @Query('page') page: number,
  ): Promise<Posts[]> {
    return await this.service.listAll(cityId, page);
  }

  @ApiQuery({ name: 'cityId', required: false })
  @ApiQuery({ name: 'page', required: false })
  @Get('/pending/')
  async listAllPending(
    @Query('cityId') cityId: string,
    @Query('page') page: number,
  ): Promise<Posts[]> {
    return await this.service.listAllPending(cityId, page);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<Posts> {
    return await this.service.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.service.remove(id);
  }
}
