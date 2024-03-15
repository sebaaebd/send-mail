import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

export type UniverseDocument = Universe & Document;

@Schema()
export class Universe {
  @Prop({ required: true, unique: true })
  name: string;
}

export const UniverseSchema = SchemaFactory.createForClass(Universe);
