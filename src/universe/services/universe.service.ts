import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Universe, UniverseDocument } from '../schemas/universe.schema';

@Injectable()
export class UniverseService {
  constructor(
    @InjectModel(Universe.name)
    private universeModel: Model<UniverseDocument>,
  ) {}

  async checkUniverseExistence(universe: string): Promise<boolean> {
    try {
      const universeName = universe.toLowerCase();

      const existingUniverse = await this.universeModel
        .findOne({
          name: {
            $regex: new RegExp(
              '^' + universeName.replace(/ /g, '\\s') + '$',
              'i',
            ),
          },
        })
        .exec();

      return !!existingUniverse;
    } catch (error) {
      throw new Error(`Error al buscar los universos: ${error.message}`);
    }
  }
}
