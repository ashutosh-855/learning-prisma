import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '../generated/prisma/client';
import { CreateSettingDto } from './dto/create-setting.dto';

@Injectable()
export class SettingService {
  constructor(private readonly databaseService: DatabaseService) {}


  async create(createSettingDto: CreateSettingDto, orgId: string,userId: string) {
   
 // userId check
  if (!userId) {
    throw new BadRequestException('Invalid/Empty userId.');
  }

  // Find user
  const user = await this.databaseService.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new NotFoundException('User not found.');
  }

  // Only ROOT can create setting
  if (user.Role !== 'ROOT') {
    throw new ForbiddenException('Permission denied.');
  }

  // Check organization
  const organization = await this.databaseService.organization.findUnique({
      where: {
        id: orgId,
      },
    });

  if (!organization) {
    throw new NotFoundException('Organization not found.');
  }

  // Create setting
  const setting = await this.databaseService.setting.create({
    data: {
      ...createSettingDto,
      orgId,
    },
  });

  return setting;
  }

 async update (createSettingDto: CreateSettingDto, orgId: string,userId: string) {

// userId check
  if (!userId) {
    throw new BadRequestException('Invalid/Empty userId.');
  }

  // Find user
  const user = await this.databaseService.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new NotFoundException('User not found.');
  }
 // ROOT any organization
  // SUPERADMIN own organization only
  // ADMIN no update permission
   if (user.Role !== 'ROOT' && !(user.Role !== 'SUPERADMIN' && user.orgId !== orgId)) {
    throw new ForbiddenException('Permission denied.');
  }
  
// check for the superAdmin and admin of their orgid.

  const organization = await this.databaseService.organization.findUnique({
      where: {
        id: orgId,
      },
    });

  if (!organization) {
    throw new NotFoundException('Organization not found.');
  }

  const setting = await this.databaseService.setting.update({
    where: {
        orgId,
    },
    data: {
        ...createSettingDto,
    },
  });
  return setting; 
}

 
}

