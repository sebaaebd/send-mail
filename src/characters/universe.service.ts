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
      // transforma los universos en array
      const universeArray = Array.isArray(universe) ? universe : [universe];

      // busca los universos en la base de datos
      const existingUniverses = await this.universeModel
        .find({ name: { $in: universeArray } })
        .exec();
      // obtiene los nombres de los universos y los retorna
      const existingUniverse = existingUniverses.map(
        (universe) => universe.name,
      );

      return existingUniverse;
    } catch (error) {
      throw new Error(`Error al buscar los universos: ${error.message}`);
    }
  }
}
