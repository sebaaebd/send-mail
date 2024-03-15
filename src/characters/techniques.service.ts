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
      // transforma las tecnicas en array
      const techniqueArray = Array.isArray(techniques)
        ? techniques
        : [techniques];

      // busca las técnicas en la base de datos
      const existingTechniques = await this.techniquesModel
        .find({ technique: { $in: techniqueArray } })
        .exec();

      // obtiene los nombres de las técnicas y los retorna
      const existingTechniqueNames = existingTechniques.map(
        (technique) => technique.technique,
      );

      return existingTechniqueNames;
    } catch (error) {
      throw new Error(`Error al buscar las técnicas: ${error.message}`);
    }
  }
}
