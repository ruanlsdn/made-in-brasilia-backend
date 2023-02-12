import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}
