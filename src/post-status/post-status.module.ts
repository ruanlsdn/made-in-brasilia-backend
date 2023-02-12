import { Module } from '@nestjs/common';
import { PostStatusService } from './post-status.service';
import { PostStatusController } from './post-status.controller';

@Module({
  controllers: [PostStatusController],
  providers: [PostStatusService]
})
export class PostStatusModule {}
