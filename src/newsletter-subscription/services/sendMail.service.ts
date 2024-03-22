import { Injectable } from '@nestjs/common';
import { CreateNewsletterSubscriptionDto } from '../dto/create-newsletter-subscription.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendMailService {
  constructor(private readonly mailerService: MailerService) {}

  sendMail(createSubscriptionDto: CreateNewsletterSubscriptionDto): void {
    const { email } = createSubscriptionDto;
    this.mailerService.sendMail({
      to: email,
      subject: '¡Bienvenido/a a nuestro mundo Saiyan! 🐉',
      template: 'newsletter',
    });
  }
}
