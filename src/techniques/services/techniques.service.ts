import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Techniques, TechniquesDocument } from '../schemas/techniques.schema';
import { StringUtils } from 'src/utils/string.utils';

@Injectable()
export class TechniquesService {
  constructor(
    @InjectModel(Techniques.name)
    private techniquesModel: Model<TechniquesDocument>,
  ) {}

  async validateTechniques(techniques: string[]) {
    const techniquesNotFound = await this.getTechniquesExits(techniques);

    if (techniquesNotFound.length > 0) {
      throw new ConflictException(
        `Estas tecnicas no fueron encontradas en la BD ${techniquesNotFound.join(', ')}`,
      );
    }
  }

  private async getTechniquesExits(techniques: string[]): Promise<string[]> {
    const techniqueNotFound = [];

    for (const name of techniques) {
      const technique = await this.techniquesModel
        .findOne({
          name: { $regex: new RegExp(StringUtils.removeWhiteSpace(name), 'i') },
        })
        .exec();
      if (!technique) {
        techniqueNotFound.push(name);
      }
    }

    return techniqueNotFound;
  }
}
