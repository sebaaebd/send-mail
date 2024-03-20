import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsletterSubscriptionService } from '../services/newsletter-subscription.service';
import { CreateNewsletterSubscriptionDto } from '../dto/create-newsletter-subscription.dto';

@Controller('newsletter')
export class NewsletterSubscriptionController {
  constructor(
    private readonly newsletterSubscriptionService: NewsletterSubscriptionService,
  ) {}

  @Post()
  create(
    @Body() createNewsletterSubscriptionDto: CreateNewsletterSubscriptionDto,
  ) {
    return this.newsletterSubscriptionService.create(
      createNewsletterSubscriptionDto,
    );
  }
}
