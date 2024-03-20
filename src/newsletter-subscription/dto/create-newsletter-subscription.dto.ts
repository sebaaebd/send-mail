import { IsString, IsEmail, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateNewsletterSubscriptionDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
