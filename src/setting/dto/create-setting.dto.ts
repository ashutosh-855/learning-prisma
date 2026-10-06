import { IsBoolean, IsString } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  timezone: string;

  @IsString()
  language: string;

  @IsBoolean()
  emailNotification: boolean;

  @IsBoolean()
  smsNotification: boolean;
}