import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';

@Injectable()
export class UserTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserTypeDto: CreateUserTypeDto) {
    return await this.prisma.userType.create({
      data: {
        description: createUserTypeDto.description,
      },
    });
  }

  async listAll() {
    return await this.prisma.userType.findMany();
  }

  async findUnique(id: number) {
    return await this.prisma.userType.findUnique({ where: { id: id } });
  }

  async update(id: number, updateUserTypeDto: UpdateUserTypeDto) {
    return await this.prisma.userType.update({
      where: { id },
      data: {
        description: updateUserTypeDto.description,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.userType.delete({ where: { id } });
  }
}
