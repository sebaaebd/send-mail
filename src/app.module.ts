import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersModule } from './characters/characters.module';
import { ConfigModule } from '@nestjs/config';
import { PlanetsModule } from './planet/planets.module';
import { TechniquesModule } from './techniques/techniques.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CharactersModule,
    PlanetsModule,
    TechniquesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
