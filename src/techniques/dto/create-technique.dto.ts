import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateTechniqueDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}
