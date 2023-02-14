import { Module } from '@nestjs/common';
import { UserTypeService } from './user-type.service';
import { UserTypeController } from './user-type.controller';

@Module({
  controllers: [UserTypeController],
  providers: [UserTypeService]
})
export class UserTypeModule {}
