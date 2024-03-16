import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Techniques, TechniquesDocument } from '../schemas/techniques.schema';

@Injectable()
export class TechniquesService {
  constructor(
    @InjectModel(Techniques.name)
    private techniquesModel: Model<TechniquesDocument>,
  ) {}

  async checkTechniqueExistence(techniques: string[]): Promise<string[]> {
    try {
      const techniqueNames = techniques.map((technique) =>
        technique.toLowerCase(),
      );

      // buscamos en la db
      const existingTechniques = await this.techniquesModel
        .find({
          name: {
            $in: techniqueNames.map(
              (techniqueName) =>
                new RegExp('^' + techniqueName.replace(/ /g, '\\s') + '$', 'i'),
            ),
          },
        })
        .exec();

      // filtramos las que no estan en la db
      const nonExistingTechniques = techniqueNames.filter(
        (techniqueName) =>
          !existingTechniques.some((technique) =>
            new RegExp(
              '^' + techniqueName.replace(/ /g, '\\s') + '$',
              'i',
            ).test(technique.name),
          ),
      );

      // devolvemos lo que no existe
      return nonExistingTechniques;
    } catch (error) {
      throw new Error(`Error al buscar las técnicas: ${error.message}`);
    }
  }
}
