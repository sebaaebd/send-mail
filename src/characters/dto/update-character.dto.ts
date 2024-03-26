import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class KiDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  base: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  max: string;
}

export class UpdateCharacterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @Exclude()
  planet: string;

  @Exclude()
  universe: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => KiDto)
  ki: KiDto;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  race: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  affiliation: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  description: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsDefined()
  @IsString({ each: true })
  techniques?: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  image: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsDefined()
  @IsString({ each: true })
  stage: string[];
}
