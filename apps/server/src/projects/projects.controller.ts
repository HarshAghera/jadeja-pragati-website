import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Param,
  Patch,
  Get,
  Delete,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectFilterDto } from './dto/project-filter.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get(':slug')
  async getProject(@Param('slug') slug: string) {
    return this.projectsService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'aboutImage', maxCount: 1 },
        { name: 'whoNeedsImage', maxCount: 1 },
        { name: 'cardImages', maxCount: 10 },
      ],
      {
        limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit per file
      },
    ),
  )
  create(
    @Body() dto: CreateProjectDto,
    @UploadedFiles()
    files: {
      aboutImage?: Express.Multer.File[];
      whoNeedsImage?: Express.Multer.File[];
      cardImages?: Express.Multer.File[];
    },
  ) {
    try {
      return this.projectsService.create(dto, files);
    } catch (error) {
      console.error(error);
    }
  }

  @Patch(':slug')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'aboutImage', maxCount: 1 },
        { name: 'whoNeedsImage', maxCount: 1 },
        { name: 'cardImages', maxCount: 10 },
      ],
      {
        limits: { fileSize: 10 * 1024 * 1024 },
      },
    ),
  )
  async update(
    @Param('slug') slug: string,
    @Body() updateDto: UpdateProjectDto,
    @UploadedFiles()
    files: {
      aboutImage?: Express.Multer.File[];
      whoNeedsImage?: Express.Multer.File[];
      cardImages?: Express.Multer.File[];
    },
  ) {
    try {
      return await this.projectsService.update(slug, updateDto, files);
    } catch (error) {
      console.error(error);
    }
  }

  @Delete(':slug')
  async delete(@Param('slug') slug: string) {
    return this.projectsService.delete(slug);
  }

  @Post('list')
  async list(@Body() filterDto: ProjectFilterDto) {
    return this.projectsService.list(filterDto);
  }
}
