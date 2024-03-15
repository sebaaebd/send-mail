import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Planets, PlanetsSchema } from './schemas/planets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Planets.name, schema: PlanetsSchema }]),
  ],
  providers: [PlanetsService],
  exports: [PlanetsService],
})
export class PlanetsModule {}
