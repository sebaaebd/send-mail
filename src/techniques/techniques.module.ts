import { Module } from '@nestjs/common';
import { TechniquesService } from './services/techniques.service';
import { Techniques, TechniquesSchema } from './schemas/techniques.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TechniquesController } from './controllers/techniques.controller';
import { TechniquesFindOneService } from './services/techniques-find-one.service';
import { CreateTechniqueService } from './services/create-techniques.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Techniques.name, schema: TechniquesSchema },
    ]),
  ],
  providers: [
    TechniquesService,
    TechniquesFindOneService,
    CreateTechniqueService,
  ],
  exports: [TechniquesService],
  controllers: [TechniquesController],
})
export class TechniquesModule {}
