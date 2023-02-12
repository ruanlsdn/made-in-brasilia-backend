import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostStatusDto } from './dto/create-post-status.dto';
import { UpdatePostStatusDto } from './dto/update-post-status.dto';

@Injectable()
export class PostStatusService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostStatusDto: CreatePostStatusDto) {
    return await this.prisma.postStatus.create({
      data: { description: createPostStatusDto.description },
    });
  }

  async listAll() {
    return await this.prisma.postStatus.findMany();
  }

  async findUnique(id: number) {
    return await this.prisma.postStatus.findUniqueOrThrow({
      where: { id: id },
    });
  }

  async update(id: number, updatePostStatusDto: UpdatePostStatusDto) {
    return await this.prisma.postStatus.update({
      where: { id: id },
      data: { description: updatePostStatusDto.description },
    });
  }

  async remove(id: number) {
    return await this.prisma.postStatus.delete({ where: { id: id } });
  }
}
