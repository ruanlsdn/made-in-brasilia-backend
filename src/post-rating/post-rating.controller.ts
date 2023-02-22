import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostRatingDto } from './dto/create-post-rating.dto';
import { PostRatingService } from './post-rating.service';

@ApiTags('post-rating')
@Controller('post-rating')
export class PostRatingController {
  constructor(private readonly postRatingService: PostRatingService) {}

  @Post()
  async create(@Body() createPostRatingDto: CreatePostRatingDto) {
    return await this.postRatingService.create(createPostRatingDto);
  }

  @Get('user-already-voted/:userId')
  async existsUserVote(@Param('userId') userId: string): Promise<boolean> {
    return await this.postRatingService.existsUserVote(userId);
  }

  @Get('avg/:postId')
  async calculateAvg(@Param('postId') postId: string) {
    return await this.postRatingService.calculateAvg(postId);
  }
}
