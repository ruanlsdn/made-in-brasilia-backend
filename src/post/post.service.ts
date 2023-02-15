import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return await this.prisma.post.create({
      data: {
        name: createPostDto.name,
        text: createPostDto.text,
        openDay: createPostDto.openDay,
        closeDay: createPostDto.closeDay,
        openTime: createPostDto.openTime,
        closeTime: createPostDto.closeTime,
        cityId: createPostDto.cityId,
        postStatusId: createPostDto.postStatusId,
      },
    });
  }

  async upload(postId: string, buffer: Buffer) {
    return await this.prisma.postImages.create({
      data: {
        postId,
        content: buffer,
      },
    });
  }

  async listAllImages() {
    return await this.prisma.postImages.findMany({});
  }

  async listAll(cityId: string, page: number): Promise<Post[]> {
    if (!isNaN(page)) {
      const PAGE_SIZE = 5;
      const skip = page * PAGE_SIZE;

      // QUERY UTILIZADA NO ADMIN
      return await this.prisma.post.findMany({
        orderBy: { name: Prisma.SortOrder.asc },
        skip,
        take: PAGE_SIZE,
      });
    }

    // QUERY UTILIZADA NO FRONTEND
    return await this.prisma.post.findMany({
      where: { cityId: cityId },
      include: { PostStatus: true },
      orderBy: { name: Prisma.SortOrder.asc },
    });
  }

  async listAllPending(cityId: string, page: number): Promise<Post[]> {
    if (!isNaN(page)) {
      const PAGE_SIZE = 5;
      const skip = page * PAGE_SIZE;

      return await this.prisma.post.findMany({
        where: { cityId: cityId, AND: { postStatusId: 1 } },
        orderBy: { name: Prisma.SortOrder.asc },
        skip,
        take: PAGE_SIZE,
      });
    }
  }

  async findUnique(id: string): Promise<Post> {
    return await this.prisma.post.findUniqueOrThrow({
      where: { id },
      include: {
        Comment: {
          include: {
            User: true,
            Answer: { include: { User: true } },
          },
        },
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    return await this.prisma.post.update({
      where: { id },
      data: {
        name: updatePostDto.name,
        text: updatePostDto.text,
        openDay: updatePostDto.openDay,
        closeDay: updatePostDto.closeDay,
        openTime: updatePostDto.openTime,
        closeTime: updatePostDto.closeTime,
        postStatusId: updatePostDto.postStatusId,
        cityId: updatePostDto.cityId,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }
}
