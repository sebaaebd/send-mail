import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsletterSubscriptionDocument = NewsletterSubscription & Document;

@Schema()
export class NewsletterSubscription {
  @Prop({ required: true, unique: true })
  email: string;
}

export const NewsletterSubscriptionSchema = SchemaFactory.createForClass(
  NewsletterSubscription,
);
