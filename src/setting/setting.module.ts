import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';

@Module({
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
