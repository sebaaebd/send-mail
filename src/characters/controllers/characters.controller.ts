import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { CharactersService } from '../services/characters.service';
import { CreateCharacterDto } from '../dto/create-character.dto';
import { UpdateCharacterDto } from '../dto/update-character.dto';
import { CharacterFindOneService } from '../services/character-find-one.service';

//este es el controlador que contiene todos los servicios que asociados a characters

@Controller('characters')
export class CharactersController {
  constructor(
    private readonly charactersService: CharactersService,
    private readonly characterFindOneService: CharacterFindOneService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.characterFindOneService.byName(name);
  }

  @Get('planet/:name')
  findRandom(
    @Param('name') planet: string,
    @Query('character') character: string,
  ) {
    return this.charactersService.findRandomPlanet(planet, character);
  }

  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.charactersService.update(name, updateCharacterDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.charactersService.remove(name);
  }
}
