import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersController } from './controllers/characters.controller';
import { CharactersService } from './services/characters.service';
import { Characters, CharactersSchema } from './schemas/characters.schema';
import { PlanetsService } from 'src/planet/services/planets.service';
import { Planets, PlanetsSchema } from 'src/planet/schemas/planets.schema';
import { TechniquesService } from 'src/techniques/services/techniques.service';
import {
  Techniques,
  TechniquesSchema,
} from 'src/techniques/schemas/techniques.schema';
import { UniverseService } from 'src/universe/services/universe.service';
import { Universe, UniverseSchema } from 'src/universe/schemas/universe.schema';
import { CharacterFindOneService } from './services/character-find-one.service';
import { CharacterExitsService } from './services/character-exits.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Characters.name, schema: CharactersSchema },
      { name: Planets.name, schema: PlanetsSchema },
      { name: Techniques.name, schema: TechniquesSchema },
      { name: Universe.name, schema: UniverseSchema },
    ]),
  ],
  controllers: [CharactersController],
  providers: [
    CharactersService,
    PlanetsService,
    TechniquesService,
    UniverseService,
    CharacterFindOneService,
    CharacterExitsService,
  ],
})
export class CharactersModule {}
