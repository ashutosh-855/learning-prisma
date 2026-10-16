import {CanActivate,ExecutionContext,Injectable,UnauthorizedException, ForbiddenException} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService,
  private readonly databaseService: DatabaseService) {}
  
  async canActivate(context: ExecutionContext

  ): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if(!authHeader) {
      throw new UnauthorizedException('Authorization header is missing.');
    }

    const [type, accessToken] = authHeader.split(' ');

      if(type !== 'Bearer' || !accessToken ) {
        throw new UnauthorizedException('Invalid authorization header');
      }

      try {
        const payload = this.jwtService.verify(accessToken, {
          secret: process.env.JWT_ACCESS_SECRET,
        });

        if (payload.tokenType !== 'access') {
          throw new UnauthorizedException('Invalid access Token.')
        }

        const user = await this.databaseService.user.findUnique({
          where: {
            id: payload.userId,
          },
        });

        if (!user) {
          throw new UnauthorizedException('User not found');
        }

        request.user = user;  



        return true;
      } 
        catch(error) {
          throw new UnauthorizedException('Invalid or expried token');
        }




    // const userId = request.user.userId;
    // const orgId = request.user.orgId;

    // const user = await this.databaseService.user.findUnique({
    //   where: {
    //     id: userId,
    //   }
    // })
  
    // if(!user) {
    //   throw new UnauthorizedException('user not found');
    // }

    // if(user.Role === 'ROOT'){
    //   return true;
    // }
    // console.log("USER FROM DATABASE:", user);
    // if((user.Role === 'SUPERADMIN' || user.Role === 'ADMIN') && user.orgId === orgId){
    //   return true;
    // }
  
    // console.log(user);
    // // console.log(userId);
    //   return false;
    // // throw new ForbiddenException('Please give the correct detail!');  
  }
} 