import { Module } from '@nestjs/common';
import { UniverseService } from './universe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Universe, UniverseSchema } from './schemas/universe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Universe.name, schema: UniverseSchema },
    ]),
  ],
  providers: [UniverseService],
  exports: [UniverseService],
})
export class UniverseModule {}
