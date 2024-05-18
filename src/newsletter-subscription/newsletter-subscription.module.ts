/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NewsletterSubscriptionController } from './controllers/newsletter-subscription.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendMailService } from './services/sendMail.service';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST'),
          port: config.get('EMAIL_PORT'),
          secure: false,
          from: config.get('EMAIL_DISPLAY'),
          auth: {
            user: config.get('EMAIL_USER'),
            pass: config.get('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `Envios Therappyhub.cl" <${config.get('EMAIL_DISPLAY')}>`,
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
    SendMailService,
  ],
})
export class NewsletterSubscriptionModule {}
