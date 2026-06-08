import { IsEmail, IsOptional, IsObject } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsObject()
  profileData?: Record<string, unknown>;
}
