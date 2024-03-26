import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateNewsletterSubscriptionDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
