import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PlanetsService } from '../../planet/services/planets.service';
import { TechniquesService } from '../../techniques/services/techniques.service';
import { UniverseService } from '../../universe/services/universe.service';

import { CharacterFindOneService } from './character-find-one.service';
import { CharacterExitsService } from './character-exits.service';

import { Characters, CharactersDocument } from '../schemas/characters.schema';

import { CreateCharacterDto } from '../dto/create-character.dto';
import { UpdateCharacterDto } from '../dto/update-character.dto';

import { CharactersResponse } from '../interface/characters.interface';

import { StringUtils } from 'src/utils/string.utils';

// aqui se definen los servicios como get, post, put, patch que luego se instancian en el controlador
@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Characters.name)
    private readonly charactersModel: Model<CharactersDocument>,
    private readonly techniquesService: TechniquesService,
    private readonly planetsService: PlanetsService,
    private readonly universeService: UniverseService,
    private readonly characterFindOneService: CharacterFindOneService,
    private readonly characterExitsService: CharacterExitsService,
  ) {}

  private async validateDataForSaving(createCharacterDTO: CreateCharacterDto) {
    const { techniques, planet, name, universe } = createCharacterDTO;

    await this.techniquesService.validateTechniques(techniques);
    await this.planetsService.validExistsPlanet(planet);
    await this.universeService.isValidUniverse(universe);
    await this.characterExitsService.unique(name);
  }

  async create(createCharacterDTO: CreateCharacterDto) {
    try {
      await this.validateDataForSaving(createCharacterDTO);



      await this.characterSave(createCharacterDTO);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async characterSave(createCharacterDTO: CreateCharacterDto) {
    const { techniques, planet, name, universe, race } = createCharacterDTO;

    console.log('guardando a personaje')
    createCharacterDTO.name = StringUtils.capitalize(name);
    createCharacterDTO.planet = StringUtils.capitalize(planet);
    createCharacterDTO.universe = StringUtils.capitalize(universe);
    createCharacterDTO.race = StringUtils.capitalize(race);
    createCharacterDTO.techniques = StringUtils.capitalizeArray(techniques);

    const character = new this.charactersModel(createCharacterDTO);
    return character.save();
  }

  private mappedCharacterResponse(characterResponse: CharactersResponse[]) {
    return characterResponse.map((character) => ({
      name: character.name,
      ki: {
        base: character.ki.base,
        max: character.ki.max,
      },
      image: character.image,
      affiliation: character.affiliation,
    }));
  }

  async findAll(): Promise<CharactersResponse[]> {
    const characters = await this.charactersModel.find().exec();
    return this.mappedCharacterResponse(characters);
  }

  //metodo para filtrar por planeta
  async findRandomPlanet(
    planet: string,
    currentCharacterName: string,
  ): Promise<CharactersResponse[]> {
    // Encuentra todos los personajes que pertenecen al planeta especificado
    const charactersFromPlanet = await this.charactersModel
      .find({ planet: { $regex: new RegExp(planet, 'i') } })
      .exec();

    // Quitamos el pj actualmente mostrado del array
    const filteredCharacters = charactersFromPlanet.filter(
      (character) => character.name !== currentCharacterName,
    );

    // Mezcla aleatoriamente la lista de personajes filtrados
    const shuffledCharacters = this.shuffleArray(filteredCharacters);

    // Selecciona los primeros 4 personajes de la lista mezclada
    const randomCharacters = shuffledCharacters.slice(0, 4);

    // Devuelve los personajes aleatorios seleccionados
    return this.mappedCharacterResponse(randomCharacters);
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  update(name: string, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${name} character ${updateCharacterDto}`;
  }

  remove(name: string) {
    return `This action removes a #${name} character`;
  }
}
