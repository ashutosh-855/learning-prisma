import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '../generated/prisma/client';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createOrganizationDto: CreateOrganizationDto, userId: string) {
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

    const organization =await this.databaseService.organization.create({
        data:{
                ...createOrganizationDto
        }
    })

    return organization;
  }

  
}
