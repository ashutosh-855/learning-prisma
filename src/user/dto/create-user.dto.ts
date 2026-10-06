import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../../generated/prisma/enums';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  Role: Role;

}
