import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '../generated/prisma/client';
import { CreateStaffDto } from './dto/create-staff.dto';

@Injectable()
export class StaffService {
  constructor(private readonly databaseService: DatabaseService) {}

// userID check!
  async create(createStaffDto: CreateStaffDto, orgId: string,userId: string) {
    if(!userId){
        throw new BadRequestException('Invalid/Empty userId.')
    }
// Find the user.
    const user = await this.databaseService.user.findUnique({
        where:{
            id: userId
        }
    })

    if(!user) {
        throw new NotFoundException('User not found.')
    }

// Check for the organization 

    const organization = await this.databaseService.organization.findUnique({
        where: {
        id: orgId,
        },
    });

    if (!organization) {
        throw new NotFoundException("organization not found.");
    }
    if(user.Role !== 'ROOT' && user.Role !== 'SUPERADMIN' && user.Role !== 'ADMIN')        
    {
        throw new ForbiddenException('Permission denied.')
    } 
// Organization scope check.
    if (user.Role != 'ROOT' && user.orgId !==  orgId) {
        throw new ForbiddenException('You can only create staff in your own organization.')
    }
    
// Staff create
    const staff = await this.databaseService.staff.create({
        data:{
                ...createStaffDto
        }
    })

    return staff;
  }

  
}
