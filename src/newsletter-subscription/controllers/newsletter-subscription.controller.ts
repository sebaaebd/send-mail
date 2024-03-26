import { Controller, Post, Body } from '@nestjs/common';
import { NewsletterSubscriptionService } from '../services/newsletter-subscription.service';
import { CreateNewsletterSubscriptionDto } from '../dto/create-newsletter-subscription.dto';
import { SendMailService } from '../services/sendMail.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Newsletter')
@Controller('newsletter')
export class NewsletterSubscriptionController {
  constructor(
    private readonly newsletterSubscriptionService: NewsletterSubscriptionService,
    private readonly sendMailService: SendMailService,
  ) {}

  @Post()
  async create(@Body() createSubscriptionDto: CreateNewsletterSubscriptionDto) {
    await this.newsletterSubscriptionService.create(createSubscriptionDto);
    this.sendMailService.sendMail(createSubscriptionDto);
  }
}
