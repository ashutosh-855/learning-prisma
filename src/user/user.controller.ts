import { Body, Controller, Param, Post} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('root')
  //  createRootUser(@Body() createUserDto: CreateUserDto) {
  //     return this.userService.createRootUser(createUserDto);
  //   }

  @Post(':orgId/:userId')
   create(@Body() createUserDto: CreateUserDto, 
   @Param('orgId') orgId: string, 
   @Param('userId') userId: string) {
      return this.userService.create(createUserDto, orgId, userId);
    }
}