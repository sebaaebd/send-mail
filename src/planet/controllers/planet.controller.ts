import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlanetDto } from '../dto/create-planet.dto';
import { CreatePlanetsService } from '../services/create-planets.service';

@Controller('planets')
export class PlanetController {
  constructor(private readonly createPlanetService: CreatePlanetsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createPlanetDto: CreatePlanetDto) {
    return this.createPlanetService.create(createPlanetDto);
  }
}
