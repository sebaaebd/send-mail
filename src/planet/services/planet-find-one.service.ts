import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Planets, PlanetsDocument } from '../schemas/planets.schema';
import { PlanetsService } from './planets.service';

@Injectable()
export class PlanetFindOneService {
  constructor(
    @InjectModel(Planets.name)
    private planetsModel: Model<PlanetsDocument>,
    private planetsService: PlanetsService,
  ) {}

  async findPlanet(name: string): Promise<void> {
    const existingPlanet = await this.planetsService.findExistingPlanets(name);

    if (existingPlanet) {
      throw new ConflictException(`El planeta ${name} ya existe`);
    }

    return null;
  }
}
