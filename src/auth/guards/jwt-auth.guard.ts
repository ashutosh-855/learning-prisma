import {CanActivate,ExecutionContext,Injectable,UnauthorizedException,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()

export class JwtAuthGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        
        
        //yahan Authorization header se token nikalenge
        const authHeader = request.headers.authorization;

        // token verify karenge
            if (!authHeader){
                throw new UnauthorizedException('Authorization hearder is missing');
            }

        /* yha ho kya rha hai ki authorization ke sath humne request meh jwt yeh bhej ta hai 
           Authorization: Bearer eyJhbGciOiJIUzI1Ni... and hume iss meh se bearer nikalna hai using slice the authHeader.*/
        const [type, accessToken] = authHeader.split(' ');
        /*yha abh is line meh yeh ho rha hai authHeader.split(' ')... authHeader = "Bearer eyJhbGciOi..."
                                                                        ↓
                                                            ["Bearer", "eyJhbGciOi..."]  So thats why we use const [type, token] , which is, (type  = "Bearer") & (token = "eyJhbGciOi...)" */
        
            if(type !== 'Bearer' || !accessToken) {
                throw new UnauthorizedException('Invalid authorization header');
            }
            try {
                const payload = this.jwtService.verify(accessToken);

                console.log(`JWT payload: ${payload}`);
                request.user = payload;

                return true;
            }
            catch (error) {
                throw new UnauthorizedException('Invalid or expired token');
            }

    
    }

}