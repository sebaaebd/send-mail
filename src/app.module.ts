import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersModule } from './characters/characters.module';
import { ConfigModule } from '@nestjs/config';
import { PlanetsModule } from './planet/planets.module';
import { TechniquesModule } from './techniques/techniques.module';
import { UniverseModule } from './universe/universe.module';
import { NewsletterSubscriptionModule } from './newsletter-subscription/newsletter-subscription.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

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
    UniverseModule,
    NewsletterSubscriptionModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
