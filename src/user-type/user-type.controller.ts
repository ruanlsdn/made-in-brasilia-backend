import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserTypeService } from './user-type.service';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';

@Controller('user-type')
export class UserTypeController {
  constructor(private readonly userTypeService: UserTypeService) {}

  @Post()
  async create(@Body() createUserTypeDto: CreateUserTypeDto) {
    return await this.userTypeService.create(createUserTypeDto);
  }

  @Get()
  async listAll() {
    return await this.userTypeService.listAll();
  }

  @Get(':id')
  async findUnique(@Param('id') id: number) {
    return await this.userTypeService.findUnique(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserTypeDto: UpdateUserTypeDto,
  ) {
    return await this.userTypeService.update(id, updateUserTypeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.userTypeService.remove(id);
  }
}
