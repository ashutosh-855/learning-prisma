import { Controller,Post ,Get ,Patch ,Delete ,Param ,Body, Req, Res } from '@nestjs/common';
import { Prisma} from '../generated/prisma/client';
import { LoginDto } from './dto/login.dto/login.dto'
import { AuthService } from './auth.service'
import type { Request, response, Response } from 'express';
import { PassThrough } from 'stream';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

// @Post ('auth')
@Post ('login')
 login ( @Body() loginDto: LoginDto,) {
 return this.authService.login(loginDto);
 }

@Post ('refresh')
 async refresh(
    @Req() request: Request,
    @Res({ passthrough: true}) response: Response,
 ) {
    const refreshToken = request.cookies.refresh_token;

    const accessToken = await this.authService.refresh(refreshToken);

    response.cookie('access_token',accessToken,{
        httpOnly: true,
        secure: false,       
        sameSite: 'strict',
    });

    return {
        message: "Access token refreshed",
    };
 }


@Post ('logout')
 async logout (@Res({ passthrough: true}) response: Response) {  
    response.clearCookie('access_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    });

    response.clearCookie('refresh_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    });

    return {
        message: 'logout successful.'
    };
 }
}
