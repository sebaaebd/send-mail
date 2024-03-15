import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { Characters, CharactersSchema } from './schemas/characters.schema';
import { TechniquesModule } from './techniques.module';
import { PlanetsModule } from './planets.module';
import { UniverseModule } from './universe.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Characters.name, schema: CharactersSchema },
    ]),
    TechniquesModule,
    PlanetsModule,
    UniverseModule,
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
