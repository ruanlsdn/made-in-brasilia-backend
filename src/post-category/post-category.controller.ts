import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostCategoryService } from './post-category.service';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { UpdatePostCategoryDto } from './dto/update-post-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('post-category')
@Controller('post-category')
export class PostCategoryController {
  constructor(private readonly postCategoryService: PostCategoryService) {}

  @Post()
  async create(@Body() createPostCategoryDto: CreatePostCategoryDto) {
    return await this.postCategoryService.create(createPostCategoryDto);
  }

  @Get()
  async listAll() {
    return await this.postCategoryService.listAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postCategoryService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostCategoryDto: UpdatePostCategoryDto,
  ) {
    return await this.postCategoryService.update(+id, updatePostCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.postCategoryService.remove(+id);
  }
}
