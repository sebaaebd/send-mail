import { Injectable, NotFoundException } from '@nestjs/common';
import { CharacterResponse } from '../interface/characters.interface';
import { Characters, CharactersDocument } from '../schemas/characters.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CharacterFindOneService {
  constructor(
    @InjectModel(Characters.name)
    private readonly charactersModel: Model<CharactersDocument>,
  ) {}
  // Método para encontrar un personaje
  private async get(name: string): Promise<CharacterResponse | null> {
    const existingCharacter = await this.byName(name);

    if (!existingCharacter) {
      throw new NotFoundException();
    }

    // Mapea el personaje encontrado a la estructura de la interfaz creada
    return {
      name: existingCharacter.name,
      image: existingCharacter.image,
      race: existingCharacter.race,
      planet: existingCharacter.planet,
      universe: existingCharacter.universe,
      description: existingCharacter.description,
      techniques: existingCharacter.techniques,
      stage: existingCharacter.stage,
    };
  }

  async byName(name: string): Promise<CharactersDocument> {
    return await this.charactersModel
      .findOne({ name: { $regex: new RegExp(name, 'i') } })
      .exec();
  }
}
