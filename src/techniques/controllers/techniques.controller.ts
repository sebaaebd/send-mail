import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TechniquesService } from '../services/techniques.service';
import { CreateTechniqueDto } from '../dto/create-technique.dto';

@Controller('techniques')
export class TechniquesController {
  constructor(private readonly techniqueService: TechniquesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createCaracterDto: CreateTechniqueDto) {
    return this.techniqueService.create(createCaracterDto);
  }
}
