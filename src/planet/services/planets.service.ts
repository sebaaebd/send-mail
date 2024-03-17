import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Planets, PlanetsDocument } from '../schemas/planets.schema';
import { CreatePlanetDto } from '../dto/create-planet.dto';
import { StringUtils } from 'src/utils/string.utils';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectModel(Planets.name)
    private planetsModel: Model<PlanetsDocument>,
  ) {}

  async checkPlanetExistence(planet: string): Promise<boolean> {
    try {
      ///pasamos a minusculas
      const planetName = planet.toLowerCase();

      // buscamos en la db
      const existingPlanet = await this.planetsModel
        .findOne({ name: { $regex: new RegExp('^' + planetName + '$', 'i') } })
        .exec();

      //devolvemos si existe o no
      return !!existingPlanet;
    } catch (error) {
      throw new Error(`Error al buscar el planeta: ${error.message}`);
    }
  }

  async create(createPlanetDto: CreatePlanetDto) {
    const { name } = createPlanetDto;

    // revisa si el planeta ya existe
    const existingPlanet = await this.planetsModel
      .findOne({
        name: {
          $regex: new RegExp('^' + name.replace(/ /g, '\\s') + '$', 'i'),
        },
      })
      .exec();
    if (existingPlanet) {
      throw new ConflictException(`El planeta '${name}' ya existe`);
    }

    createPlanetDto.name = StringUtils.capitalize(name);
    const planet = new this.planetsModel(createPlanetDto);
    return planet.save();
  }
}
