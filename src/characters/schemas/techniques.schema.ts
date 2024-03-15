import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

export type TechniquesDocument = Techniques & Document;

@Schema()
export class Techniques {
  @Prop({ required: true, unique: true })
  technique: string;
}

export const TechniquesSchema = SchemaFactory.createForClass(Techniques);
