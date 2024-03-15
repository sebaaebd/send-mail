import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Planets, PlanetsDocument } from './schemas/planets.schema';
import { connection } from 'mongoose';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectModel(Planets.name)
    private planetsModel: Model<PlanetsDocument>,
  ) {}

  async findExistingPlanets(planets: string | string[]): Promise<string[]> {
    try {
      // Transforma los planetas en array para revisar
      const planetArray = Array.isArray(planets) ? planets : [planets];

      //evita la distincion entre mayusculas y minusculas
      const planetName = planetArray.map((planet) => new RegExp(planet, 'i'));

      // Busca los planetas en la base de datos
      const existingPlanets = await this.planetsModel
        .find({ name: { $in: planetName } })
        .exec();

      // Obtiene los nombres de los planetas existentes
      const existingPlanetNames = existingPlanets.map((planet) => planet.name);
      return existingPlanetNames;
    } catch (error) {
      throw new Error(`Error al buscar los planetas: ${error.message}`);
    }
  }
}
