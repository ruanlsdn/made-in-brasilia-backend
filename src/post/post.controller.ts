import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

// TODO: Adicionar relacionamento entre Post e User quando tiver um módulo de login na aplicação.
// TODO: Verificar uma maneira de carregar imagens para o banco ou para a aplicação.
@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto);
  }

  @ApiQuery({ name: 'cityId', required: false })
  @ApiQuery({ name: 'page', required: false })
  @Get()
  async listAll(@Query('cityId') cityId: string, @Query('page') page: number) {
    return await this.postService.listAll(cityId, page);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.postService.remove(id);
  }
}
