import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  UploadedFiles,
  UseInterceptors,
  Put,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { CharactersService } from '../services/characters.service';
import { CreateCharacterDto } from '../dto/create-character.dto';
import { UpdateCharacterDto } from '../dto/update-character.dto';
import { CharacterFindOneService } from '../services/character-find-one.service';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
  NoFilesInterceptor,
} from '@nestjs/platform-express/multer';
import { CharacterDeleteService } from '../services/character-delete.service';
import { CharactersUpdateService } from '../services/characters-update.service';
import { CharacterImageService } from '../services/character-images.service';
import { CharactersDocument } from '../schemas/characters.schema';
import { ApiTags } from '@nestjs/swagger';

//este es el controlador que contiene todos los servicios que asociados a characters

@ApiTags('Characters')
@Controller('characters')
export class CharactersController {
  constructor(
    private readonly charactersService: CharactersService,
    private readonly characterFindOneService: CharacterFindOneService,
    private readonly deleteCharacterService: CharacterDeleteService,
    private readonly updateCharacterService: CharactersUpdateService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createCharacterDto: CreateCharacterDto,
  ) {
    return this.charactersService.create(createCharacterDto, images);
  }

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.characterFindOneService.byName(name);
  }

  @Get('planet/:name')
  findRandom(
    @Param('name') planet: string,
    @Query('character') character: string,
  ) {
    return this.charactersService.findRandomPlanet(planet, character);
  }

  @Put(':name')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profile', maxCount: 1 },
      { name: 'stages', maxCount: 4 },
    ]),
  )
  async update(
    @Param('name') name: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
    @UploadedFiles()
    files: { profile?: Express.Multer.File[]; stages?: Express.Multer.File[] },
  ): Promise<CharactersDocument> {
    const profileImage = files.profile ? files.profile[0] : null;
    const stageImages = files.stages || [];
    return await this.updateCharacterService.updateCharacterWithImages(
      name,
      updateCharacterDto,
      profileImage,
      stageImages,
    );
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    return this.deleteCharacterService.removeCharacter(name);
  }
}
