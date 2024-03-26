import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Characters, CharactersDocument } from '../schemas/characters.schema';
import { Model } from 'mongoose';
import { CharacterFindOneService } from './character-find-one.service';
import { DeleteImageService } from 'src/cloudinary/services/delete-image.service';

@Injectable()
export class CharacterDeleteService {
  constructor(
    @InjectModel(Characters.name)
    private readonly charactersModel: Model<CharactersDocument>,
    private readonly deleteImageService: DeleteImageService,
    private readonly findOneService: CharacterFindOneService,
  ) {}

  async removeCharacter(name: string): Promise<string> {
    try {
      const character = await this.findOneService.byName(name);

      if (!character) {
        throw new BadRequestException(`Personaje '${name}' no existe.`);
      }
      await this.deleteImages(character);
      const characterId = character._id;
      await this.charactersModel.deleteOne({ _id: characterId }).exec();
      return `El personaje '${name}' ha sido eliminado correctamente.`;
    } catch (error) {
      throw error;
    }
  }

  private async deleteImages(character: CharactersDocument): Promise<void> {
    try {
      //borra la principal
      const profile = await this.deleteImageService.deleteImageByUrl(
        character.image,
      );
      //borra las de stages
      const stages = await Promise.all(
        character.stage.map(async (stageUrl) => {
          await this.deleteImageService.deleteImageByUrl(stageUrl);
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}
