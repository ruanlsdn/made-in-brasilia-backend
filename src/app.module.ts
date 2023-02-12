import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { CityModule } from './city/city.module';
import { PostModule } from './post/post.module';
import { PostStatusModule } from './post-status/post-status.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    OpenaiModule,
    CityModule,
    PostModule,
    PostStatusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
