import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { Characters, CharactersSchema } from './schemas/characters.schema';
import { TechniquesModule } from './techniques.module';
import { UniverseModule } from './universe.module';
import { PlanetsService } from 'src/planet/services/planets.service';
import { Planets, PlanetsSchema } from 'src/planet/schemas/planets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Characters.name, schema: CharactersSchema },
      { name: Planets.name, schema: PlanetsSchema },
    ]),
    TechniquesModule,
    UniverseModule,
  ],
  controllers: [CharactersController],
  providers: [CharactersService, PlanetsService],
})
export class CharactersModule {}
