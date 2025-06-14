import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true, versionKey: false })
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  imagePublicId?: string;

  @Prop()
  isPublished?: boolean;

  @Prop()
  shortDescription?: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
