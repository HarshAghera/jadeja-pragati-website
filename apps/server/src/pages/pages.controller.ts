import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GroupedNav } from './pages.interface';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.pagesService.findAll();
  }

  @Get('nav')
  async getNavStructure(): Promise<GroupedNav> {
    return this.pagesService.findGroupedNav();
  }

  @Get(':slug')
  @UseGuards(JwtAuthGuard)
  async findBySlug(@Param('slug') slug: string) {
    return this.pagesService.findBySlug(slug);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateDto: CreatePageDto) {
    return this.pagesService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return this.pagesService.delete(id);
  }
}
