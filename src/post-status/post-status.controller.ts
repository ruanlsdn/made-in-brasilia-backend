import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostStatusService } from './post-status.service';
import { CreatePostStatusDto } from './dto/create-post-status.dto';
import { UpdatePostStatusDto } from './dto/update-post-status.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('post-status')
@Controller('post-status')
export class PostStatusController {
  constructor(private readonly postStatusService: PostStatusService) {}

  @Post()
  async create(@Body() createPostStatusDto: CreatePostStatusDto) {
    return await this.postStatusService.create(createPostStatusDto);
  }

  @Get()
  async listAll() {
    return await this.postStatusService.listAll();
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    return await this.postStatusService.findUnique(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostStatusDto: UpdatePostStatusDto,
  ) {
    return await this.postStatusService.update(+id, updatePostStatusDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.postStatusService.remove(+id);
  }
}
