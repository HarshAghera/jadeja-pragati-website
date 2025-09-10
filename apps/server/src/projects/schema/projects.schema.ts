import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Hero {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}
export const HeroSchema = SchemaFactory.createForClass(Hero);

@Schema()
export class About {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  imagePublicId?: string;
}
export const AboutSchema = SchemaFactory.createForClass(About);

@Schema()
export class Card {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  imagePublicId?: string;
}
export const CardSchema = SchemaFactory.createForClass(Card);

@Schema()
export class WhoNeeds {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  points: string[];

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  imagePublicId?: string;
}
export const WhoNeedsSchema = SchemaFactory.createForClass(WhoNeeds);

@Schema()
export class Docs {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  paragraph: string;

  @Prop({ type: [String], required: true })
  items: string[];
}
export const DocsSchema = SchemaFactory.createForClass(Docs);

@Schema()
export class Faq {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;
}
export const FaqSchema = SchemaFactory.createForClass(Faq);

@Schema({ timestamps: true, versionKey: false })
export class Project {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: HeroSchema, required: true })
  hero: Hero;

  @Prop({ type: AboutSchema, required: true })
  about: About;

  @Prop({ type: [CardSchema], default: [] })
  cards: Card[];

  @Prop({ type: WhoNeedsSchema, required: true })
  whoNeeds: WhoNeeds;

  @Prop({ type: DocsSchema, required: true })
  documents: Docs;

  @Prop({ type: [FaqSchema], default: [] })
  faqs: Faq[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
