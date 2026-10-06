import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../../generated/prisma/enums';

export class CreateStaffDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  experience: string;
  @IsString()
  Designation: string;

}