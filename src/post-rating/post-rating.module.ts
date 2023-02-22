import { Module } from '@nestjs/common';
import { PostRatingService } from './post-rating.service';
import { PostRatingController } from './post-rating.controller';

@Module({
  controllers: [PostRatingController],
  providers: [PostRatingService]
})
export class PostRatingModule {}
