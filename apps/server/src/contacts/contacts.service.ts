import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<ContactDocument>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const created = new this.contactModel(createContactDto);
    return created.save();
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  async delete(id: string): Promise<Contact> {
    const deleted = await this.contactModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Contact with id ${id} not found`);
    }
    return deleted;
  }
}
