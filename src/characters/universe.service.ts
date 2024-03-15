import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Universe, UniverseDocument } from './schemas/universe.schema';

@Injectable()
export class UniverseService {
  constructor(
    @InjectModel(Universe.name)
    private universeModel: Model<UniverseDocument>,
  ) {}

  async findExistingUniverse(universe: string | string[]): Promise<string[]> {
    try {
      const universeArray = Array.isArray(universe) ? universe : [universe];

      const Universes = universeArray.map(
        (universe) => new RegExp(universe, 'i'),
      );

      const existingUniverses = await this.universeModel
        .find({ name: { $in: Universes } })
        .exec();

      const existingUniverseNames = existingUniverses.map(
        (universe) => universe.name,
      );

      return existingUniverseNames;
    } catch (error) {
      throw new Error(`Error al buscar los universos: ${error.message}`);
    }
  }
}
