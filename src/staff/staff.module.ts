import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthModule } from '../auth/auth.module';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [StaffController],
  providers: [
    StaffService,
    AuthGuard,
  ],
})

export class StaffModule {}
