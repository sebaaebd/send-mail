import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePlanetDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
