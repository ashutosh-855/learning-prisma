import { Body, Controller, Param, Post} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffService } from './staff.service'
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  // @Post('root')
  //  createRootUser(@Body() createUserDto: CreateUserDto) {
  //     return this.userService.createRootUser(createUserDto);
  //   }

  @Post(':orgId/:userId')
   create(@Body() createStaffDto: CreateStaffDto, 
   @Param('orgId') orgId: string, 
   @Param('userId') userId: string) {
      return this.staffService.create(createStaffDto, orgId, userId);
    }
}
