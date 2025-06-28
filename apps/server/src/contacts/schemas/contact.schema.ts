// src/contacts/schemas/contact.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true, versionKey: false })
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: false })
  message: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
