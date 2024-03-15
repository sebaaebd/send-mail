import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Techniques, TechniquesDocument } from './schemas/techniques.schema';

@Injectable()
export class TechniquesService {
  constructor(
    @InjectModel(Techniques.name)
    private techniquesModel: Model<TechniquesDocument>,
  ) {}

  async findExistingTechniques(
    techniques: string | string[],
  ): Promise<string[]> {
    try {
      const techniqueArray = Array.isArray(techniques)
        ? techniques
        : [techniques];

      const techniqueName = techniqueArray.map(
        (techniques) => new RegExp(techniques, 'i'),
      );

      const existingTechniques = await this.techniquesModel
        .find({ technique: { $in: techniqueName } })
        .exec();

      const existingTechniqueNames = existingTechniques.map(
        (technique) => technique.technique,
      );

      return existingTechniqueNames;
    } catch (error) {
      throw new Error(`Error al buscar las técnicas: ${error.message}`);
    }
  }
}
