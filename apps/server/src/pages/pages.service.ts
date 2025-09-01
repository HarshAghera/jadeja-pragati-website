// pages.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PageDocument } from './schema/pages.schema';
import { CreatePageDto, PageListDto } from './dto/create-page.dto';
import { GroupedNav } from './pages.interface';

@Injectable()
export class PagesService {
  constructor(@InjectModel(Page.name) private pageModel: Model<PageDocument>) {}

  async create(createPageDto: CreatePageDto): Promise<Page> {
    const createdPage = new this.pageModel(createPageDto);
    return createdPage.save();
  }

  async findAll(pageListDto: PageListDto): Promise<Page[]> {
    const findObj = {};
    if (pageListDto.category) {
      findObj['category'] = pageListDto.category;
    }
    return await this.pageModel.find(findObj).sort({ createdAt: -1 }).exec();
  }

  async findBySlug(slug: string): Promise<Page> {
    const page = await this.pageModel.findOne({ slug, isActive: true }).exec();
    if (!page) throw new NotFoundException('Page not found');
    return page;
  }

  async update(id: string, updateDto: CreatePageDto): Promise<Page> {
    const page = await this.pageModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!page) throw new NotFoundException('Page not found');
    return page;
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const result = await this.pageModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0)
      throw new NotFoundException('Page not found');
    return { deleted: true };
  }

  async findGroupedNav(): Promise<GroupedNav> {
    const pages = await this.pageModel
      .find({ showInNavbar: true, isActive: true })
      .exec();

    const grouped: GroupedNav = {};

    for (const page of pages) {
      const cat = page.category || 'Uncategorized';
      const sub = page.subcategory || 'General';
      const subsub = page.subsubcategory || 'Default';

      if (!grouped[cat]) grouped[cat] = {};
      if (!grouped[cat][sub]) grouped[cat][sub] = {};
      if (!grouped[cat][sub][subsub]) grouped[cat][sub][subsub] = [];

      grouped[cat][sub][subsub].push({ title: page.title, slug: page.slug });
    }

    return grouped;
  }
}
