import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Planets, PlanetsDocument } from './schemas/planets.schema';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectModel(Planets.name)
    private planetsModel: Model<PlanetsDocument>,
  ) {}

  async findExistingPlanets(planets: string | string[]): Promise<string[]> {
    try {
      // transforma los planetas en array pa revisar
      const planetArray = Array.isArray(planets) ? planets : [planets];

      // busca los planetas en la base de datos
      const existingPlanets = await this.planetsModel
        .find({ name: { $in: planetArray } })
        .exec();

      // obtiene los nombres de los planetas y los retorna
      const existingPlanetNames = existingPlanets.map((planet) => planet.name);

      return existingPlanetNames;
    } catch (error) {
      throw new Error(`Error al buscar los planetas: ${error.message}`);
    }
  }
}
