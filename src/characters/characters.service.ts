import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Characters, CharactersDocument } from './schemas/characters.schema';
import { Model } from 'mongoose';

// aqui se definen los servicios como get, post, put, patch que luego se instancian en el controlador
@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Characters.name)
    private readonly charactersModel: Model<CharactersDocument>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const { name } = createCharacterDto;
    const existingCharacter = await this.charactersModel
      .findOne({ name })
      .exec();
    if (existingCharacter) {
      return { message: `Character '${name}' already exists` };
    }

    const characterCreate =
      await this.charactersModel.create(createCharacterDto);
    return characterCreate.save();
  }

  async findAll(): Promise<CharactersResponse[]> {
    const characters = await this.charactersModel.find().exec();
    // Se mapean los resultados a la estructura de la interfaz creada
    return characters.map((character) => ({
      name: character.name,
      planet: character.planet,
      ki: {
        baseKi: character.ki.baseKi,
        maxKi: character.ki.maxKi,
      },
      image: character.image,
      race: character.race,
      afiliation: character.afiliation,
      description: character.description,
      techniques: character.techniques,
    }));
  }

  async findOne(name: string) {
    const existingCharacter = await this.charactersModel
      .findOne({ name })
      .exec();
    if (!existingCharacter) {
      return { message: `Character '${name}' doesn't exists` };
    }
    return existingCharacter;
  }

  update(name: string, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${name} character`;
  }

  remove(name: string) {
    return `This action removes a #${name} character`;
  }
}
