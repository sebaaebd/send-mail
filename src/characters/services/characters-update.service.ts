import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Characters, CharactersDocument } from '../schemas/characters.schema';
import { Model } from 'mongoose';
import { TechniquesService } from 'src/techniques/services/techniques.service';
import { UpdateCharacterDto } from '../dto/update-character.dto';
import { StringUtils } from 'src/utils/string.utils';
import { CharacterFindOneService } from './character-find-one.service';
import { CharacterExitsService } from './character-exits.service';
import { CharacterImageService } from './character-images.service';
import { PlanetsService } from '../../planet/services/planets.service';
import { UniverseService } from '../../universe/services/universe.service';

@Injectable()
export class CharactersUpdateService {
  constructor(
    @InjectModel(Characters.name)
    private readonly charactersModel: Model<CharactersDocument>,
    private readonly techniquesService: TechniquesService,
    private readonly characterExitsService: CharacterExitsService,
    private readonly characterImageService: CharacterImageService,
  ) {}

  private async validateData(updateCharacterDto: UpdateCharacterDto) {
    const { techniques, name } = updateCharacterDto;
    await this.techniquesService.validateTechniques(techniques);
    await this.characterExitsService.unique(name);
    if (
      updateCharacterDto.planet !== undefined ||
      updateCharacterDto.universe !== undefined
    ) {
      throw new BadRequestException(
        'Los campos planet y universe no pueden ser actualizados.',
      );
    }
  }

  async updateCharacterWithImages(
    name: string,
    updateCharacterDto: UpdateCharacterDto,
    profileImage: Express.Multer.File,
    stageImages: Express.Multer.File[],
  ): Promise<CharactersDocument> {
    try {
      await this.validateData(updateCharacterDto);
      await this.characterImageService.updateImages(
        name,
        updateCharacterDto,
        profileImage,
        stageImages,
      );
      return await this.characterUpdate(name, updateCharacterDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async characterUpdate(name: string, updateCharacterDTO: UpdateCharacterDto) {
    try {
      const updateFields = {
        name: StringUtils.capitalize(updateCharacterDTO.name),
        ki: updateCharacterDTO.ki,
        race: StringUtils.capitalize(updateCharacterDTO.race),
        affiliation: StringUtils.capitalize(updateCharacterDTO.affiliation),
        description: StringUtils.capitalize(updateCharacterDTO.description),
        techniques: StringUtils.capitalizeArray(updateCharacterDTO.techniques),
        image: updateCharacterDTO.image,
        stage: updateCharacterDTO.stage,
      };

      const updatedCharacter = await this.charactersModel
        .findOneAndUpdate(
          { name: StringUtils.capitalize(name) },
          updateFields,
          { new: true },
        )
        .exec();

      if (!updatedCharacter) {
        throw new BadRequestException(`No se pudo actualizar el personaje.`);
      }

      return updatedCharacter;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
