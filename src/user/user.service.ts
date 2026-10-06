import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '../generated/prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { dot } from 'node:test/reporters';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createRootUser(createUserDto: CreateUserDto) {
    if(createUserDto.Role !== 'ROOT') {
        throw new BadRequestException('Invalid role.')
    }

    // const rootUserExists = await this.databaseService.user.findFirst({
    //     where:{
    //         Role: 'ROOT'
    //     }
    // })
    // if(rootUserExists) {
    //     throw new ConflictException('Root user already exists.')
    // }

    

    const rootUser =await this.databaseService.user.create({
        data:{
            ...createUserDto
        }
    })

    return rootUser;
  }


  async createSuperAdmin(createUserDto: CreateUserDto, orgId: string, userId: string){
    

   
    //First check the dto that is the role user provide is SUPERADIM.

    if(createUserDto.Role !== 'ROOT') {
        throw new BadRequestException('Invalid role.')
  }

    //check that the orginization have the super admin.

    //Check that superAdmin is already exist or not.

    // const superAdminExist = await this.databaseService.user.findFirst({
    //     where: {
    //         Role : "SUPERADMIN",
    //         orgId
    //     }
    // })
    // //superAdmin exist then throw error.
    // if (superAdminExist) {
    //     throw new BadRequestException('Invalid role.')
    // }

    // // now you have the permission to create the superAdmin.

    // const superAdmin = await this.databaseService.user.create({
    //     data: createUserDto
    // });

    // return superAdmin;

//   async create(createUserDto: CreateUserDto, userId: string) {
//     if(!userId){
//         throw new BadRequestException('Invalid/Empty userId.')
//     }

//     const user = await this.databaseService.user.findUnique({
//         where:{
//             id: userId
//         }
//     })

//     if(!user) {
//         throw new NotFoundException('User not found.')
//     }
//     if(user.Role !== 'ROOT') {
//         throw new UnauthorizedException('Permission denied.')
//     }

//     const organization =await this.databaseService.user.create({
//         data:{
//         ...createUserDto
//         }
//     })

//     return user;
//   }

}


async create(dto: CreateUserDto, orgId: string, userId: string) {
// Case 1: Creating SuperAdmin in Organization

        if(dto.Role === "SUPERADMIN") {
const rootExists = await this.databaseService.user.findFirst({
        where:{
            id: userId,
            Role: 'ROOT'
        }
    })

    if(!rootExists) {
        throw new UnauthorizedException('Permission denied.')
    }

    const orgExists = await this.databaseService.organization.findUnique({
        where:{
            id: orgId
        }
    })

    if(!orgExists) {
        throw new NotFoundException("Organization doesn't exists.")
    }

    console.log(orgExists)
    const superAdminExists = await this.databaseService.user.findFirst({
        where:{
            orgId: orgId,
            Role: "SUPERADMIN"
        }
    })


    if(superAdminExists){
       throw new ConflictException(`SuperAdmin already exists: ${superAdminExists.name}`) 
    }

 await this.databaseService.user.create({
        data: {
            ...dto,
            orgId,
        },
    });

    return {
        "success": true,
        "message": "Superadmin created successfully."
    }
        }

    

    // Case 2: Create Admin in Organization
        if(dto.Role === 'ADMIN') {
            
            const userExists = await this.databaseService.user.findFirst({
        where:{
            id: userId,
            
        }

        
    })

    if(userExists?.Role !== 'SUPERADMIN' && userExists?.Role !== 'ROOT') {
        throw new UnauthorizedException('Permission denied.')
    }

    if(userExists.Role === 'SUPERADMIN' && userExists.orgId !== orgId)  {
        throw new UnauthorizedException('Permission denied.')
    }

    //Hashing the password.
    const { password, ...userData } = dto;

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.databaseService.user.create({
        data:{
            ...userData,
            password: hashedPassword,
            orgId,
        }
        
    })

    return {
        "success" : true,
        "message": "Admin created successfully."
    }

        }



}

}
