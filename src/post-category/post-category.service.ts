import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { UpdatePostCategoryDto } from './dto/update-post-category.dto';

@Injectable()
export class PostCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostCategoryDto: CreatePostCategoryDto) {
    return await this.prisma.postCategory.create({
      data: { description: createPostCategoryDto.description },
    });
  }

  async listAll() {
    return await this.prisma.postCategory.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.postCategory.findUnique({ where: { id: id } });
  }

  async update(id: number, updatePostCategoryDto: UpdatePostCategoryDto) {
    return await this.prisma.postCategory.update({
      where: { id: id },
      data: {
        description: updatePostCategoryDto.description,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.postCategory.delete({ where: { id: id } });
  }
}
