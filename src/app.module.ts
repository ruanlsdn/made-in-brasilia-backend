import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { CityModule } from './city/city.module';

@Module({
  imports: [PrismaModule, OpenaiModule, ConfigModule.forRoot(), CityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
