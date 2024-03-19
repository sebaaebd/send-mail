import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Planets, PlanetsDocument } from '../schemas/planets.schema';
import { StringUtils } from 'src/utils/string.utils';
import { CreatePlanetDto } from '../dto/create-planet.dto';
import { PlanetFindOneService } from './planet-find-one.service';

@Injectable()
export class CreatePlanetsService {
  constructor(
    @InjectModel(Planets.name)
    private planetsModel: Model<PlanetsDocument>,
    private planetsFindOneService: PlanetFindOneService,
  ) {}

  private async validateData(createPlanetDto: CreatePlanetDto) {
    const { name } = createPlanetDto;
    await this.planetsFindOneService.findPlanet(name);
  }

  async create(createPlanetDto: CreatePlanetDto) {
    try {
      await this.validateData(createPlanetDto);
      await this.planetSave(createPlanetDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async planetSave(createPlanetDto: CreatePlanetDto) {
    const { name } = createPlanetDto;
    createPlanetDto.name = StringUtils.capitalize(name);
    const planet = new this.planetsModel(createPlanetDto);
    return planet.save();
  }
}
