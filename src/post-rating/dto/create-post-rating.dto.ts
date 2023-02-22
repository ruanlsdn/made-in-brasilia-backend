import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostRatingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsIn([1, 2, 3, 4, 5])
  rate: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  postId: string;
}
