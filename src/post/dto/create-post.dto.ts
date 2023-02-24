import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  openDay: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  closeDay: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  openTime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  closeTime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cityId: string;

  @ApiProperty()
  @IsInt()
  postCategoryId: number;

  @ApiProperty()
  @IsInt()
  @IsIn([1, 2, 3])
  postStatusId: number;
}
