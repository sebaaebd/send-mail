import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Techniques, TechniquesDocument } from '../schemas/techniques.schema';
import { CreateTechniqueDto } from '../dto/create-technique.dto';

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

  async create(createTechniqueDto: CreateTechniqueDto) {
    const { name } = createTechniqueDto;

    // revisa si el personaje ya existe
    const existingTechnique = await this.techniquesModel
      .findOne({
        name: {
          $regex: new RegExp('^' + name.replace(/ /g, '\\s') + '$', 'i'),
        },
      })
      .exec();
    if (existingTechnique) {
      throw new ConflictException(`La técnica '${name}' ya existe`);
    }

    const technique = new this.techniquesModel(createTechniqueDto);
    return technique.save();
  }
}
