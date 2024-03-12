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

  create(createCharacterDto: CreateCharacterDto) {
    return 'This action adds a new item';
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

  findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
