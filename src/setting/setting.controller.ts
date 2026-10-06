import { Body, Controller, Param, Post, Patch} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { CreateSettingDto } from './dto/create-setting.dto';
import { SettingService } from './setting.service'
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  // @Post('root')
  //  createRootUser(@Body() createUserDto: CreateUserDto) {
  //     return this.userService.createRootUser(createUserDto);
  //   }

  @Post(':orgId/:userId')
   create(@Body() createSettingDto: CreateSettingDto, 
   @Param('orgId') orgId: string, 
   @Param('userId') userId: string) {
      return this.settingService.create(createSettingDto, orgId, userId);
    }

   @Patch(':orgId/:userId')
   update(@Body() createSettingDto: CreateSettingDto, 
   @Param('orgId') orgId: string, 
   @Param('userId') userId: string) {
      return this.settingService.update(createSettingDto, orgId, userId);
    }
  }