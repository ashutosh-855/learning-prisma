import { Body, Controller, Param, Post} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}


  


  @Post(':userId')
   create(@Body() createOrganizationDto: CreateOrganizationDto, @Param('userId') userId: string) {
      return this.organizationService.create(createOrganizationDto, userId);
    }

  
}
