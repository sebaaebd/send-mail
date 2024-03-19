import { Injectable } from '@nestjs/common';
import { CreateNewsletterSubscriptionDto } from '../dto/create-newsletter-subscription.dto';

@Injectable()
export class NewsletterSubscriptionService {
  create(createNewsletterSubscriptionDto: CreateNewsletterSubscriptionDto) {
    return 'Éxito al enviar datos desde el front';
  }
}
