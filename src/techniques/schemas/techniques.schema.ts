import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TechniquesDocument = Techniques & Document;

@Schema()
export class Techniques {
  @Prop({ required: true, unique: true })
  name: string;
}

export const TechniquesSchema = SchemaFactory.createForClass(Techniques);
