import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '../generated/prisma/client';
import { CreateStaffDto } from './dto/create-staff.dto';

@Injectable()
export class StaffService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createStaffDto: CreateStaffDto, orgId: string,userId: string) {
    if(!userId){
        throw new BadRequestException('Invalid/Empty userId.')
    }

    const user = await this.databaseService.user.findUnique({
        where:{
            id: userId
        }
    })

    if(!user) {
        throw new NotFoundException('User not found.')
    }
    if(user.Role !== 'ROOT') {
        throw new ForbiddenException('Permission denied.')
    }

    const organization =await this.databaseService.staff.create({
        data:{
                ...createStaffDto,
                orgId: orgId
        }
    })

    return organization;
  }

  
}
