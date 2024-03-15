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
} from 'class-validator';
import { Type } from 'class-transformer';

/*se crea una clase para Ki, ya que este se crea como objeto dentro del documento en mongo
así no se crea con un id diferente*/
class KiDto {
  @IsString()
  @IsNotEmpty()
  base: string;

  @IsString()
  @IsNotEmpty()
  max: string;
}

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  planet: string;

  @IsString()
  @IsNotEmpty()
  universe: string;

  @ValidateNested()
  @Type(() => KiDto)
  ki: KiDto;

  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  race: string;

  @IsString()
  @IsNotEmpty()
  affiliation: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  techniques: string[];

  @IsUrl({}, { each: true })
  @ArrayUnique()
  @ArrayMinSize(4, { message: 'There must be 4 URLs in stage' })
  @ArrayMaxSize(4, { message: "Can't have more than 4 URLs in stage." })
  stage: string;
}
