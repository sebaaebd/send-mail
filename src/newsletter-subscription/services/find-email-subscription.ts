/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  NewsletterSubscription,
  NewsletterSubscriptionDocument,
} from '../schema/newsletter-subscription.schema';
import { Model } from 'mongoose';
import { StringUtils } from 'src/utils/string.utils';

@Injectable()
export class FindEmailSubscriptionService {
  constructor(
    @InjectModel(NewsletterSubscription.name)
    private NewsletterSubscriptionModel: Model<NewsletterSubscriptionDocument>,
  ) {}

  private async findExistingEmail(
    email: string,
  ): Promise<NewsletterSubscriptionDocument> {
    if (!StringUtils.validEmail(email)) {
      throw new ConflictException('Correo electrónico no válido');
    }
    return await this.NewsletterSubscriptionModel.findOne({
      email: { $regex: new RegExp(email, 'i') },
    }).exec();
  }

  async findEmail(email: string) {
    const existingEmail = await this.findExistingEmail(email);

    if (existingEmail) {
      throw new ConflictException(`El correo ${email} ya existe`);
    }

    return null;
  }
}
