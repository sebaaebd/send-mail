import { Module } from '@nestjs/common';
import { PlanetsService } from './services/planets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Planets, PlanetsSchema } from './schemas/planets.schema';
import { PlanetController } from './controllers/planet.controller';
import { CreatePlanetsService } from './services/create-planets.service';
import { PlanetFindOneService } from './services/planet-find-one.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Planets.name, schema: PlanetsSchema }]),
  ],
  providers: [PlanetsService, CreatePlanetsService, PlanetFindOneService],
  exports: [PlanetsService],
  controllers: [PlanetController],
})
export class PlanetsModule {}
