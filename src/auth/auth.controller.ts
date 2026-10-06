import { Controller,Post ,Get ,Patch ,Delete ,Param ,Body } from '@nestjs/common';
import { Prisma} from '../generated/prisma/client';
import { LoginDto } from './dto/login.dto/login.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

// @Post ('auth')
@Post ('login')
 login ( @Body() loginDto: LoginDto,) {
 return this.authService.login(loginDto);
 }

}
