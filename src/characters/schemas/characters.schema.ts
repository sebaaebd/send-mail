import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CharactersDocument = Characters & Document;

@Schema()
export class Characters {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  planet: string;

  @Prop({
    type: {
      baseKi: { type: String, required: true },
      maxKi: { type: String, required: true },
    },
    required: true,
  })
  ki: {
    baseKi: string;
    maxKi: string;
  };

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  race: string;

  @Prop({ required: true })
  afiliation: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  techniques: string[];
}
export const CharactersSchema = SchemaFactory.createForClass(Characters);
