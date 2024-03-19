import { Module } from '@nestjs/common';
import { NewsletterSubscriptionService } from './services/newsletter-subscription.service';
import { NewsletterSubscriptionController } from './controllers/newsletter-subscription.controller';

@Module({
  controllers: [NewsletterSubscriptionController],
  providers: [NewsletterSubscriptionService],
})
export class NewsletterSubscriptionModule {}
