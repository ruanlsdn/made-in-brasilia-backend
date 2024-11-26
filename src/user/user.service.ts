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
        email: createUserDto.email,
        userTypeId: createUserDto.userTypeId,
      },
    });

    return { ...response, password: undefined };
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
    return await this.prisma.user.findFirstOrThrow({
      where: {
        username: username,
      },
    });
  }

  async findById(id: string) {
    const response = await this.prisma.user.findUniqueOrThrow({
      where: { id: id },
    });
    return { ...response, password: undefined };
  }

  async changePassword(updateUserDto: UpdateUserDto) {
    const response = await this.prisma.user.findFirstOrThrow({
      where: { email: updateUserDto.email },
    });

    await this.prisma.user.update({
      where: { id: response.id },
      data: {
        password: bcrypt.hashSync(updateUserDto.password, 10),
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const response = await this.prisma.user.update({
      where: { id: id },
      data: {
        username: updateUserDto.username,
        password: bcrypt.hashSync(updateUserDto.password, 10),
        userTypeId: updateUserDto.userTypeId,
      },
    });

    return { ...response, password: undefined };
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id: id } });
  }
}
