import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Characters, CharactersDocument } from '../schemas/characters.schema';
import { Model } from 'mongoose';
import { CharacterFindOneService } from './character-find-one.service';

@Injectable()
export class CharacterExitsService {
  constructor(
    @InjectModel(Characters.name)
    private readonly charactersModel: Model<CharactersDocument>,
    private readonly characterFindOneService: CharacterFindOneService,
  ) {}
  async unique(name: string) {
    const character = await this.characterFindOneService.get(name);

    if (character) {
      throw new ConflictException(`El personaje ${name}, ya existe`);
    }
  }
}
