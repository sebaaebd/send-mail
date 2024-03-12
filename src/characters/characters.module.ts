import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { Characters, CharactersSchema } from './schemas/characters.schema';

// aquí en el array importamos nuestro o nuestros schemas para posteriormente, interactuar con ellos
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Characters.name,
        schema: CharactersSchema,
      },
    ]),
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
