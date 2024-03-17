import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PlanetsService } from '../services/planets.service';
import { CreatePlanetDto } from '../dto/create-planet.dto';

@Controller('planet')
export class PlanetController {
  constructor(private readonly planetService: PlanetsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createPlanetDto: CreatePlanetDto) {
    return this.planetService.create(createPlanetDto);
  }
}
