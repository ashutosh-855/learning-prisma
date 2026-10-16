import { Body, Controller, Param, Post ,Get ,Req ,UseGuards} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffService } from './staff.service'
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  // @Post('root')
  //  createRootUser(@Body() createUserDto: CreateUserDto) {
  //     return this.userService.createRootUser(createUserDto);
  //   }
  
// @get requset
@UseGuards(AuthGuard)
@Get('test/:orgId/:userId')
test() {
  return {
    message: 'Guard passed',
  };
}


  @UseGuards(AuthGuard)
  @Post(':orgId')
   create(@Body() createStaffDto: CreateStaffDto, 
   @Param('orgId') orgId: string,
   @Req() request:any 
   ) {
      return this.staffService.create(createStaffDto, orgId ,request.user);
    }
}
