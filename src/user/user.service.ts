import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: bcrypt.hashSync(createUserDto.password, 10),
        userTypeId: 1,
      },
    });
  }

  async listAll() {
    return await this.prisma.user.findMany({
      orderBy: { username: Prisma.SortOrder.asc },
    });
  }

  async findUnique(username: string, password: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        username: username,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id: id },
      data: {
        username: updateUserDto.username,
        password: bcrypt.hashSync(updateUserDto.password, 10),
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id: id } });
  }
}
