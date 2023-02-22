import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostRatingDto } from './dto/create-post-rating.dto';
import { UpdatePostRatingDto } from './dto/update-post-rating.dto';

@Injectable()
export class PostRatingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostRatingDto: CreatePostRatingDto) {
    return await this.prisma.postRating.create({
      data: {
        rate: createPostRatingDto.rate,
        userId: createPostRatingDto.userId,
        postId: createPostRatingDto.postId,
      },
    });
  }

  async existsUserVote(userId: string): Promise<boolean> {
    try {
      await this.prisma.postRating.findFirstOrThrow({
        where: {
          userId,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async calculateAvg(postId: string) {
    const response = await this.prisma.postRating.aggregate({
      _avg: { rate: true },
      _count: {
        rate: true,
      },
      where: {
        postId,
      },
    });

    return {
      avg: response._avg.rate,
      count: response._count.rate,
    };
  }
}
