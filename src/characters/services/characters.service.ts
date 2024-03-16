import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCharacterDto } from '../dto/create-character.dto';
import { UpdateCharacterDto } from '../dto/update-character.dto';
import { Characters, CharactersDocument } from '../schemas/characters.schema';
import { TechniquesService } from '../../techniques/services/techniques.service';
import { PlanetsService } from '../../planet/services/planets.service';
import { UniverseService } from '../../universe/services/universe.service';
import { Model } from 'mongoose';
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
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const { name, techniques, planet, race, universe } = createCharacterDto;

    //validación planetas
    const planetExists = await this.planetsService.checkPlanetExistence(planet);
    if (!planetExists) {
      throw new ConflictException(`El planeta '${planet}' no existe.`);
    }

    //validación universos
    const universeExists =
      await this.universeService.checkUniverseExistence(universe);
    if (!universeExists) {
      throw new ConflictException(`El universo '${universe}' no existe.`);
    }

    //validación técnicas
    const nonExistingTechniques =
      await this.techniquesService.checkTechniqueExistence(techniques);

    if (nonExistingTechniques.length > 0) {
      throw new ConflictException(
        `Las siguientes técnicas no existen: ${nonExistingTechniques.join(', ')}`,
      );
    }

    // revisa si el personaje ya existe
    const existingCharacter = await this.charactersModel
      .findOne({ name: { $regex: new RegExp(name, 'i') } })
      .exec();
    if (existingCharacter) {
      throw new ConflictException(`El personaje '${name}' ya existe`);
    }

    createCharacterDto.name = StringUtils.capitalize(name);
    createCharacterDto.planet = StringUtils.capitalize(planet);
    createCharacterDto.universe = StringUtils.capitalize(universe);
    createCharacterDto.race = StringUtils.capitalize(race);
    createCharacterDto.techniques = StringUtils.capitalizeArray(techniques);

    // Crear el personaje
    const character = new this.charactersModel(createCharacterDto);
    return character.save();
  }

  //Metodo para encontrar a todos los personajes
  async findAll(): Promise<CharactersResponse[]> {
    const characters = await this.charactersModel.find().exec();
    // Se mapean los resultados a la estructura de la interfaz creada
    return characters.map((character) => ({
      name: character.name,
      ki: {
        base: character.ki.base,
        max: character.ki.max,
      },
      image: character.image,
      affiliation: character.affiliation,
    }));
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
    return randomCharacters.map((character) => ({
      name: character.name,
      ki: {
        base: character.ki.base,
        max: character.ki.max,
      },
      image: character.image,
      affiliation: character.affiliation,
    }));
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
