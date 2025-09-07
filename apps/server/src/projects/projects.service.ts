import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CloudinaryService } from '../common/configs/cloudinary/cloudinary.service';
import { ProjectFilterDto } from './dto/project-filter.dto';
import { Project, ProjectDocument } from './schema/projects.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findBySlug(slug: string): Promise<Project> {
    const project = await this.projectModel.findOne({ slug }).exec();
    if (!project) {
      throw new NotFoundException(`Project with slug "${slug}" not found`);
    }
    return project;
  }

  async create(
    createDto: CreateProjectDto,
    files: {
      aboutImage?: Express.Multer.File[];
      whoNeedsImage?: Express.Multer.File[];
      cardImages?: Express.Multer.File[];
    },
  ): Promise<Project> {
    if (files.aboutImage?.[0]) {
      const { url, public_id } = await this.cloudinaryService.uploadImage(
        files.aboutImage[0].buffer,
        'projects',
      );
      createDto.about.imageUrl = url;
      createDto.about.imagePublicId = public_id;
    }

    if (files.whoNeedsImage?.[0]) {
      const { url, public_id } = await this.cloudinaryService.uploadImage(
        files.whoNeedsImage[0].buffer,
        'projects',
      );
      createDto.whoNeeds.imageUrl = url;
      createDto.whoNeeds.imagePublicId = public_id;
    }

    if (createDto.cards && files.cardImages?.length) {
      // Upload the single image only once
      const { url, public_id } = await this.cloudinaryService.uploadImage(
        files.cardImages[0].buffer,
        'projects',
      );

      // Attach the same image info to each card
      createDto.cards = createDto.cards.map((cardDto) => ({
        ...cardDto,
        imageUrl: url,
        imagePublicId: public_id,
      }));
    }

    const createdProject = new this.projectModel(createDto);
    return createdProject.save();
  }

  async update(
    slug: string,
    updateDto: UpdateProjectDto,
    files: {
      aboutImage?: Express.Multer.File[];
      whoNeedsImage?: Express.Multer.File[];
      cardImages?: Express.Multer.File[];
    },
  ): Promise<Project> {
    const project = await this.projectModel.findOne({ slug }).exec();
    if (!project) {
      throw new NotFoundException(`Project with slug "${slug}" not found`);
    }

    // For AboutDto
    if (files.aboutImage?.[0]) {
      if (project.about?.imagePublicId) {
        await cloudinary.uploader.destroy(project.about.imagePublicId);
      }
      const { url, public_id } = await this.cloudinaryService.uploadImage(
        files.aboutImage[0].buffer,
        'projects',
      );
      updateDto.about = {
        title: updateDto.about?.title ?? project.about.title,
        description: updateDto.about?.description ?? project.about.description,
        imageUrl: url,
        imagePublicId: public_id,
      };
    }

    // For WhoNeedsDto
    if (files.whoNeedsImage?.[0]) {
      if (project.whoNeeds?.imagePublicId) {
        await cloudinary.uploader.destroy(project.whoNeeds.imagePublicId);
      }
      const { url, public_id } = await this.cloudinaryService.uploadImage(
        files.whoNeedsImage[0].buffer,
        'projects',
      );
      updateDto.whoNeeds = {
        title: updateDto.whoNeeds?.title ?? project.whoNeeds.title,
        description:
          updateDto.whoNeeds?.description ?? project.whoNeeds.description,
        points: updateDto.whoNeeds?.points ?? project.whoNeeds.points,
        imageUrl: url,
        imagePublicId: public_id,
      };
    }

    if (updateDto.cards) {
      // Ensure there's always a matching card in the existing data (by index or some ID)
      updateDto.cards = await Promise.all(
        updateDto.cards.map(async (cardDto, idx) => {
          let imageUrl = cardDto.imageUrl;
          let imagePublicId = cardDto.imagePublicId;

          // Use existing card for fallback if it exists
          const existingCard = project.cards?.[idx];

          // Upload new image if file exists for this card
          if (files.cardImages && files.cardImages[idx]) {
            const { url, public_id } = await this.cloudinaryService.uploadImage(
              files.cardImages[idx].buffer,
              'projects',
            );
            imageUrl = url;
            imagePublicId = public_id;
          } else if (!imageUrl && existingCard) {
            // Use old image if updateDto doesn't have it and old exists
            imageUrl = existingCard.imageUrl;
            imagePublicId = existingCard.imagePublicId;
          }

          // If imageUrl is still missing, this is a problem!
          if (!imageUrl) {
            throw new Error(`Image is required for card at index ${idx}`);
          }

          return {
            title: cardDto.title ?? existingCard?.title,
            description: cardDto.description ?? existingCard?.description,
            imageUrl,
            imagePublicId,
          };
        }),
      );
    }

    // Deep merge util: updates nested objects while preserving old data if not in updateDto
    function deepMerge<T extends object, S extends object>(
      target: T,
      src: S,
    ): T & S {
      Object.keys(src).forEach((key) => {
        const srcValue = (src as Record<string, unknown>)[key];
        const targetValue = (target as Record<string, unknown>)[key];

        if (isObject(srcValue) && isObject(targetValue)) {
          deepMerge(targetValue, srcValue);
        } else if (srcValue !== undefined) {
          (target as Record<string, unknown>)[key] = srcValue;
        }
      });

      return target as T & S;
    }

    function isObject(item: unknown): item is Record<string, unknown> {
      return item !== null && typeof item === 'object' && !Array.isArray(item);
    }

    // Perform deep merge: update only provided fields, keep old data for others
    deepMerge(project, updateDto);

    return project.save();
  }

  async list(filterDto: ProjectFilterDto) {
    const {
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = filterDto;

    const skip = (page - 1) * limit;

    const filter = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { 'hero.title': { $regex: search, $options: 'i' } },
            { 'about.title': { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const sortOptions: Record<string, 1 | -1> = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [total, data] = await Promise.all([
      this.projectModel.countDocuments(filter),
      this.projectModel
        .find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .exec(),
    ]);

    return { total, page, limit, data };
  }

  async delete(slug: string) {
    const project = await this.projectModel.findOne({ slug }).exec();
    if (!project) {
      throw new NotFoundException(`Project with slug "${slug}" not found`);
    }

    if (project.about.imagePublicId) {
      await cloudinary.uploader.destroy(project.about.imagePublicId);
    }

    if (project.whoNeeds.imagePublicId) {
      await cloudinary.uploader.destroy(project.whoNeeds.imagePublicId);
    }

    for (const card of project.cards) {
      if (card.imagePublicId) {
        await cloudinary.uploader.destroy(card.imagePublicId);
      }
    }

    await this.projectModel.findOneAndDelete({ slug });
    return { message: 'Project deleted successfully' };
  }
}
