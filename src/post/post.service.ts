import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return await this.prisma.post.create({
      data: {
        name: createPostDto.name,
        text: createPostDto.text,
        openDay: createPostDto.openDay,
        closeDay: createPostDto.closeDay,
        openTime: createPostDto.openTime,
        closeTime: createPostDto.closeTime,
        cityId: createPostDto.cityId,
        postStatusId: 1,
      },
    });
  }

  async listAll(cityId: string, page: number): Promise<Post[]> {
    if (!isNaN(page)) {
      const PAGE_SIZE = 5;
      const skip = page * PAGE_SIZE;

      // QUERY UTILIZADA NO ADMIN
      return await this.prisma.post.findMany({
        where: { cityId: cityId },
        orderBy: { name: Prisma.SortOrder.asc },
        skip,
        take: PAGE_SIZE,
      });
    }

    // QUERY UTILIZADA NO FRONTEND
    return await this.prisma.post.findMany({
      where: { cityId: cityId },
      orderBy: { name: Prisma.SortOrder.asc },
    });
  }

  async findUnique(id: string) {
    return await this.prisma.post.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: { id },
      data: {
        name: updatePostDto.name,
        text: updatePostDto.text,
        openDay: updatePostDto.openDay,
        closeDay: updatePostDto.closeDay,
        openTime: updatePostDto.openTime,
        closeTime: updatePostDto.closeTime,
        cityId: updatePostDto.cityId,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.post.delete({ where: { id } });
  }
}
