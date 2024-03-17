import { Module } from '@nestjs/common';
import { TechniquesService } from './services/techniques.service';
import { Techniques, TechniquesSchema } from './schemas/techniques.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TechniquesController } from './controllers/techniques.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Techniques.name, schema: TechniquesSchema },
    ]),
  ],
  providers: [TechniquesService],
  exports: [TechniquesService],
  controllers: [TechniquesController],
})
export class TechniquesModule {}
