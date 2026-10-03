import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';

@Module({
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
