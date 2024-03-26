/*importamos la clase de validaciones para que revise si los tipos de datos 
se cumplen o parametros designados se cumplen*/
import {
  IsString,
  IsNotEmpty,
  IsUrl,
  ValidateNested,
  ArrayMinSize,
  ArrayUnique,
  ArrayMaxSize,
  IsArray,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/*se crea una clase para Ki, ya que este se crea como objeto dentro del documento en mongo
así no se crea con un id diferente*/
class KiDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  base: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  max: string;
}

export class CreateCharacterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  planet: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  universe: string;

  @ApiProperty()
  @ValidateNested()
  @IsDefined()
  @Type(() => KiDto)
  ki: KiDto;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  @IsDefined()
  image: string;

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
  techniques: string[];

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsDefined()
  @IsUrl({}, { each: true })
  @ArrayUnique()
  @ArrayMinSize(4, { message: 'There must be 4 URLs in stage' })
  @ArrayMaxSize(4, { message: "Can't have more than 4 URLs in stage." })
  stage: string[];
}
