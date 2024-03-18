import { BadRequestException, Injectable } from '@nestjs/common';
import { Techniques, TechniquesDocument } from '../schemas/techniques.schema';
import { TechniquesFindOneService } from './techniques-find-one.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTechniqueDto } from '../dto/create-technique.dto';
import { StringUtils } from 'src/utils/string.utils';

@Injectable()
export class CreateTechniqueService {
  constructor(
    @InjectModel(Techniques.name)
    private techniquesModel: Model<TechniquesDocument>,
    private techniqueFindOneService: TechniquesFindOneService,
  ) {}

  private async validateData(createTechniqueDto: CreateTechniqueDto) {
    const { name } = createTechniqueDto;
    await this.techniqueFindOneService.findTechnique(name);
  }
  createTechniqueDto;
  async create(createTechniqueDto: CreateTechniqueDto) {
    try {
      await this.validateData(createTechniqueDto);
      await this.techniqueSave(createTechniqueDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async techniqueSave(createTechniqueDto: CreateTechniqueDto) {
    const { name } = createTechniqueDto;
    createTechniqueDto.name = StringUtils.capitalize(name);
    const technique = new this.techniquesModel(createTechniqueDto);
    return technique.save();
  }
}
