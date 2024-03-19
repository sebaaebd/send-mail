import { ConflictException, Injectable } from '@nestjs/common';
import { Techniques, TechniquesDocument } from '../schemas/techniques.schema';
import { Model } from 'mongoose';
import { StringUtils } from 'src/utils/string.utils';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TechniquesFindOneService {
  constructor(
    @InjectModel(Techniques.name)
    private techniquesModel: Model<TechniquesDocument>,
  ) {}

  private async findExistingTechnique(
    name: string,
  ): Promise<TechniquesDocument> {
    return await this.techniquesModel
      .findOne({
        name: { $regex: new RegExp(StringUtils.removeWhiteSpace(name), 'i') },
      })
      .exec();
  }

  async findTechnique(name: string) {
    const existingTechnique = await this.findExistingTechnique(name);

    if (existingTechnique) {
      throw new ConflictException(`La técnica ${name} ya existe`);
    }

    return null;
  }
}
