/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NewsletterSubscriptionModule } from './newsletter-subscription/newsletter-subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    NewsletterSubscriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
