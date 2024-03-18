import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Universe, UniverseDocument } from '../schemas/universe.schema';
import { Universe as IUniverse } from '../interfaces/universe.interface';
import { StringUtils } from 'src/utils/string.utils';

@Injectable()
export class UniverseService {
  constructor(
    @InjectModel(Universe.name)
    private universeModel: Model<UniverseDocument>,
  ) {}

  async isValidUniverse(universe: string) {
    const universeBD = await this.findExistingUniverse(universe);

    if (!universeBD) {
      throw new ConflictException(`El universo ${universe} no existe`);
    }
  }

  async findExistingUniverse(universe: string): Promise<IUniverse> {
    return await this.universeModel
      .findOne({
        name: {
          $regex: new RegExp(StringUtils.removeWhiteSpace(universe), 'i'),
        },
      })
      .exec();
  }
}
