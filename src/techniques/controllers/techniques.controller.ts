import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateTechniqueDto } from '../dto/create-technique.dto';
import { CreateTechniqueService } from '../services/create-techniques.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Techniques')
@Controller('techniques')
export class TechniquesController {
  constructor(
    private readonly createTechniqueService: CreateTechniqueService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTechniqueDto: CreateTechniqueDto) {
    return this.createTechniqueService.create(createTechniqueDto);
  }
}
