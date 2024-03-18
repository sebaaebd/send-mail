import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

export class CreatePlanetDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}
