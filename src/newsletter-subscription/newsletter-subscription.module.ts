import { Module } from '@nestjs/common';
import { NewsletterSubscriptionService } from './services/newsletter-subscription.service';
import { NewsletterSubscriptionController } from './controllers/newsletter-subscription.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NewsletterSubscription,
  NewsletterSubscriptionSchema,
} from './schema/newsletter-subscription.schema';
import { SendMailService } from './services/sendMail.service';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FindEmailSubscriptionService } from './services/find-email-subscription';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NewsletterSubscription.name,
        schema: NewsletterSubscriptionSchema,
      },
    ]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `Guerreros Z <${config.get('MAIL_USER')}>`,
        },
        template: {
          dir: join(__dirname, '/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [NewsletterSubscriptionController],
  providers: [
    NewsletterSubscriptionService,
    FindEmailSubscriptionService,
    SendMailService,
  ],
})
export class NewsletterSubscriptionModule {}
