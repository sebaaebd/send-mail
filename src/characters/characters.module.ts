import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersController } from './controllers/characters.controller';
import { CharactersService } from './services/characters.service';
import { Characters, CharactersSchema } from './schemas/characters.schema';
import { UniverseModule } from './universe.module';
import { PlanetsService } from 'src/planet/services/planets.service';
import { Planets, PlanetsSchema } from 'src/planet/schemas/planets.schema';
import { TechniquesService } from 'src/techniques/services/techniques.service';
import {
  Techniques,
  TechniquesSchema,
} from 'src/techniques/schemas/techniques.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Characters.name, schema: CharactersSchema },
      { name: Planets.name, schema: PlanetsSchema },
      { name: Techniques.name, schema: TechniquesSchema },
    ]),
    UniverseModule,
  ],
  controllers: [CharactersController],
  providers: [CharactersService, PlanetsService, TechniquesService],
})
export class CharactersModule {}
