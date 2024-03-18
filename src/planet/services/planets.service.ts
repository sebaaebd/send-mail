import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Planets, PlanetsDocument } from '../schemas/planets.schema';
import { StringUtils } from 'src/utils/string.utils';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectModel(Planets.name)
    private planetsModel: Model<PlanetsDocument>,
  ) {}

  async validExistsPlanet(planet: string) {
    const planetDB = await this.findExistingPlanets(planet);
    if (!planetDB) {
      throw new ConflictException(`El planeta ${planet} no existe`);
    }
  }

  async findExistingPlanets(planet: string): Promise<PlanetsDocument> {
    return await this.planetsModel
      .findOne({
        name: { $regex: new RegExp(StringUtils.removeWhiteSpace(planet), 'i') },
      })
      .exec();
  }
}
