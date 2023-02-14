import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsIn([1, 2, 3])
  userTypeId: number;
}
