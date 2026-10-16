import { Injectable,UnauthorizedException,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { LoginDto } from './dto/login.dto/login.dto';
import { access } from 'fs';
import { Role } from '../generated/prisma/enums';
import { tokenToString } from 'typescript';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly databaseService: DatabaseService,
  ) {}

    private hashToken(token: string): string {
    return createHash('sha256')
      .update(token)
      .digest('hex');
  }

    async login(loginDto: LoginDto) {

      const user = await this.databaseService.user.findUnique({
        where: {
          email: loginDto.email,
        }
      });

      if(!user) {
        throw new UnauthorizedException('Invalid email or password.');
      }
    
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if(!passwordMatch) {
        throw new UnauthorizedException('Invalid email or password');
    }
    
    const accessToken = this.jwtService.sign({
      userId: user.id,
      role: user.Role,
      tokenType: 'access',
    },
      {
       secret: process.env.JWT_ACCESS_SECRET,
       expiresIn: '15m',
      }
  );

  const refreshToken = this.jwtService.sign({
      userId: user.id,
      tokenType: 'refresh'
  },
    {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d'
  }
);

    return {
      access_token: accessToken,
      refreshToken
    };

//Add the refresh method.
    
    }
  
  async refresh(refreshToken: string) {
    try {
      //verify the refresh Token.
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      //confirm that is it a refresh token
      
      if(payload.tokenType !== 'refresh') {
        throw new UnauthorizedException('Invalid refresh token');
      }

      //fetch the current user form the database.

      const user = await this.databaseService.user.findUnique({
        where: {
          id: payload.userId,
        },
      });

      if (!user || !user.refreshTokenHash) {
        throw new UnauthorizedException('Refresh token revoked');
      }


      const incomingHash = this.hashToken(refreshToken);  

        if (incomingHash !== user.refreshTokenHash) {
          throw new UnauthorizedException('Invalid refresh token');
      }

      //Generating the new access token.
      const accessToken = this.jwtService.sign({
        userId: payload.userId,
        role: user.Role,
        tokenType: 'access',
      },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      },
    );

    //return the new access Token.
    return accessToken;

    } catch(error) {
        console.error('Refresh error:' , error);
        throw new UnauthorizedException('Invalid or expired refresh token');
    }


    






  // async login(loginDto: LoginDto) {
  //   // 1. Find user
  //   const user = await this.jwtService.user.findUnique({
  //     where: {
  //       email: loginDto.email,
  //     },
  //   });

  //   if (!user) {
  //     throw new UnauthorizedException('Invalid email or password.');
  //   }

  //   // 2. Compare password
  //   const passwordMatch = await bcrypt.compare(
  //     loginDto.password,
  //     user.password,
  //   );

  //   if (!passwordMatch) {
  //     throw new UnauthorizedException('Invalid email or password.');
  //   }

  //   // JWT next step
  //   return {
  //     message: 'Login successful',
  //     userId: user.id,
  //     role: user.Role,
  //   };
  // }
}

    async logout(refreshToken?: string) {
      if (!refreshToken) return;

      try {
        const payload = this.jwtService.verify(refreshToken, {
          secret: process.env.JWT_REFRESH_SECRET,
        });

        if (payload.tokenType !== 'refresh') return;

        await this.databaseService.user.updateMany({
          where: { id: payload.userId },
          data: { refreshTokenHash: null },
        });
      } catch {
        // Invalid ya expired token ho tab bhi logout allow karo.
      }
    }
}