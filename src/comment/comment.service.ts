import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    return await this.prisma.comment.create({
      data: {
        text: createCommentDto.text,
        postId: createCommentDto.postId,
        userId: createCommentDto.userId,
      },
    });
  }

  async listAll() {
    return await this.prisma.comment.findMany({});
  }

  async findUnique(id: string) {
    return await this.prisma.comment.findUniqueOrThrow({ where: { id: id } });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return await this.prisma.comment.update({
      where: { id: id },
      data: {
        text: updateCommentDto.text,
      },
    });
  }

  async remove(id: string) {
    await this.prisma.comment.delete({ where: { id: id } });
  }
}
