import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlanetsDocument = Planets & Document;

@Schema()
export class Planets {
  @Prop({ required: true, unique: true })
  name: string;
}

export const PlanetsSchema = SchemaFactory.createForClass(Planets);
