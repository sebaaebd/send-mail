import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNewsletterSubscriptionDto } from '../dto/create-newsletter-subscription.dto';
import { FindEmailSubscriptionService } from './find-email-subscription';
import { InjectModel } from '@nestjs/mongoose';
import { NewsletterSubscription } from '../schema/newsletter-subscription.schema';
import { Model } from 'mongoose';
import { SendMailService } from './sendMail.service';

@Injectable()
export class NewsletterSubscriptionService {
  constructor(
    @InjectModel(NewsletterSubscription.name)
    private subscriptionModel: Model<NewsletterSubscription>,
    private readonly findEmailService: FindEmailSubscriptionService,
  ) {}

  private async validateEmail(
    createSubscriptionDto: CreateNewsletterSubscriptionDto,
  ) {
    const { email } = createSubscriptionDto;
    await this.findEmailService.findEmail(email);
  }

  async create(createSubscriptionDto: CreateNewsletterSubscriptionDto) {
    try {
      await this.validateEmail(createSubscriptionDto);
      await this.emailSave(createSubscriptionDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async emailSave(createSubscriptionDto: CreateNewsletterSubscriptionDto) {
    const email = new this.subscriptionModel(createSubscriptionDto);
    return email.save();
  }
}
