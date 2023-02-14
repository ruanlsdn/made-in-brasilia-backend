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
    const response = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: bcrypt.hashSync(createUserDto.password, 10),
        userTypeId: 1,
      },
    });

    return { password: null, ...response };
  }

  async listAll(page: number) {
    const PAGE_SIZE = 10;
    const skip = page * PAGE_SIZE;

    if (isNaN(page)) {
      return await this.prisma.user.findMany({
        include: { userType: true },
        orderBy: { username: Prisma.SortOrder.asc },
        take: PAGE_SIZE,
      });
    }

    return await this.prisma.user.findMany({
      include: { userType: true },
      orderBy: { username: Prisma.SortOrder.asc },
      skip,
      take: PAGE_SIZE,
    });
  }

  async findUnique(username: string) {
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
        userTypeId: updateUserDto.userTypeId,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id: id } });
  }
}
