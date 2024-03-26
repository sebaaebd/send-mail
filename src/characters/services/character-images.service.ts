import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Characters, CharactersDocument } from '../schemas/characters.schema';
import { Model } from 'mongoose';
import { UpdateCharacterDto } from '../dto/update-character.dto';
import { StringUtils } from 'src/utils/string.utils';
import { CharacterFindOneService } from './character-find-one.service';
import { DeleteImageService } from 'src/cloudinary/services/delete-image.service';
import { UploadFilesService } from 'src/cloudinary/services/uploadFiles.service';

Injectable();
export class CharacterImageService {
  constructor(
    @InjectModel(Characters.name)
    private readonly charactersModel: Model<CharactersDocument>,
    private readonly deleteImageService: DeleteImageService,
    private readonly uploadFilesService: UploadFilesService,
    private readonly findOneService: CharacterFindOneService,
  ) {}

  private async findName(name: string): Promise<CharactersDocument> {
    const character = await this.findOneService.byName(name);
    if (!character) {
      throw new BadRequestException(`El personaje '${name}' no existe.`);
    }
    return character;
  }

  async updateImages(
    name: string,
    updateCharacterDto: UpdateCharacterDto,
    profileImage: Express.Multer.File,
    stageImages: Express.Multer.File[],
  ): Promise<CharactersDocument> {
    try {
      const newName = StringUtils.capitalize(updateCharacterDto.name);
      const character = await this.findName(name);
      const folder = 'DragonBall Image Database';
      const characterFolder = newName.replace(/\s/g, '_');
      const characterFolderUrl = `${folder}/${characterFolder}`;
      const stagesFolderUrl = `${characterFolderUrl}/stages`;

      if (profileImage) {
        await this.updateImageField(
          character,
          profileImage,
          characterFolderUrl,
        );
      }

      if (stageImages && stageImages.length === 4) {
        await this.updateStageImages(character, stageImages, stagesFolderUrl);
      }

      return await this.charactersModel
        .findOne({ name: StringUtils.capitalize(name) })
        .exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async updateImageField(
    character: CharactersDocument,
    newImage: Express.Multer.File,
    folderUrl: string,
  ): Promise<void> {
    if (character.image) {
      await this.deleteImageService.deleteImageByUrl(character.image);
    }

    const [cloudinaryResponse] = await this.uploadFilesService.uploadFiles(
      [newImage],
      folderUrl,
    );
    const imageUrl = cloudinaryResponse.secure_url;

    await this.charactersModel
      .findOneAndUpdate({ _id: character._id }, { image: imageUrl })
      .exec();
  }

  private async updateStageImages(
    character: CharactersDocument,
    newImages: Express.Multer.File[],
    folderUrl: string,
  ): Promise<void> {
    const existingStageUrls = character.stage || [];
    for (const url of existingStageUrls) {
      await this.deleteImageService.deleteImageByUrl(url);
    }

    const stageUrls = [];
    for (const image of newImages) {
      const [cloudinaryResponse] = await this.uploadFilesService.uploadFiles(
        [image],
        folderUrl,
      );
      const imageUrl = cloudinaryResponse.secure_url;
      stageUrls.push(imageUrl);
    }

    await this.charactersModel
      .findOneAndUpdate({ _id: character._id }, { stage: stageUrls })
      .exec();
  }
}
