import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}
