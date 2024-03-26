import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

export class CreatePlanetDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}
