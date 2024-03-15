import { Module } from '@nestjs/common';
import { TechniquesService } from './services/techniques.service';
import { Techniques, TechniquesSchema } from './schemas/techniques.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Techniques.name, schema: TechniquesSchema },
    ]),
  ],
  providers: [TechniquesService],
  exports: [TechniquesService],
})
export class TechniquesModule {}
