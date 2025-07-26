import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PageDocument = Page & Document;

@Schema({ timestamps: true })
export class Page {
  @Prop({ required: true }) title: string;
  @Prop({ required: true, unique: true }) slug: string;
  @Prop() category: string;
  @Prop() subcategory: string;
  @Prop() subsubcategory: string;
  @Prop() description?: string;
  @Prop({ required: true }) htmlContent: string;
  @Prop({ default: true }) showInNavbar: boolean;
  @Prop({ default: true }) isActive: boolean;
}

export const PageSchema = SchemaFactory.createForClass(Page);
