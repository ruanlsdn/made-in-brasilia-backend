import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, password: string) {
    try {
      const user: User = await this.userService.findUnique(username);

      if (!bcrypt.compareSync(password, user.password)) return null;

      return { password, ...user };
    } catch (error) {
      return null;
    }
  }
}
