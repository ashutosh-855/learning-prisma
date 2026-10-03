import { IsEmail, IsInt, IsString, IsUrl } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsInt()
  staffCount: number;

  @IsString()
  address: string;

  @IsUrl()
  website: string;

  @IsEmail()
  email: string;
}
