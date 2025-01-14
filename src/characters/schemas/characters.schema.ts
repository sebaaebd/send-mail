import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CharactersDocument = Characters & Document;

export class Ki {
  @Prop()
  base: string;

  @Prop()
  max: string;
}

@Schema()
export class Characters {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  planet: string;

  @Prop({ required: true })
  universe: string;

  @Prop({ type: Ki })
  ki: Ki;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  race: string;

  @Prop({ required: true })
  affiliation: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  techniques: string[];

  @Prop({ type: [String], required: true })
  stage: string[];
}
export const CharactersSchema = SchemaFactory.createForClass(Characters);
