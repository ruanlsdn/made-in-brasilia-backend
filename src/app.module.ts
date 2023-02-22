import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { CityModule } from './city/city.module';
import { PostModule } from './post/post.module';
import { PostStatusModule } from './post-status/post-status.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserTypeModule } from './user-type/user-type.module';
import { CommentModule } from './comment/comment.module';
import { PostCategoryModule } from './post-category/post-category.module';
import { PostRatingModule } from './post-rating/post-rating.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    OpenaiModule,
    CityModule,
    PostModule,
    PostStatusModule,
    UserModule,
    AuthModule,
    UserTypeModule,
    CommentModule,
    PostCategoryModule,
    PostRatingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
