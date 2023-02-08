import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  controllers: [CityController],
  providers: [CityService],
  imports: [OpenaiModule],
})
export class CityModule {}
