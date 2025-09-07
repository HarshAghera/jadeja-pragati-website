import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from '../common/configs/cloudinary/cloudinary.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { v2 as cloudinary } from 'cloudinary';
import { BlogFilterDto } from './dto/blog-filter.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findById(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
    return blog;
  }

  async create(createBlogDto: CreateBlogDto, imageBuffer: Buffer) {
    let imageUrl: string | undefined = undefined;
    let imagePublicId: string | undefined = undefined;

    if (typeof createBlogDto.isPublished === 'string') {
      createBlogDto.isPublished =
        createBlogDto.isPublished.toLowerCase() === 'true';
    }

    if (imageBuffer) {
      const { url, public_id } = await this.cloudinaryService.uploadImage(
        imageBuffer,
        'blogs',
      );
      imageUrl = url;
      imagePublicId = public_id;
    }

    const createdBlog = new this.blogModel({
      ...createBlogDto,
      imageUrl,
      imagePublicId,
    });

    return createdBlog.save();
  }

  async update(id: string, updateBlogDto: UpdateBlogDto, imageBuffer?: Buffer) {
    // Convert isPublished from string to boolean
    if (typeof updateBlogDto.isPublished === 'string') {
      updateBlogDto.isPublished =
        updateBlogDto.isPublished.toLowerCase() === 'true';
    }

    if (imageBuffer) {
      const blog = await this.blogModel.findById(id);
      if (!blog) {
        throw new NotFoundException(`Blog with ID ${id} not found`);
      }

      if (blog.imagePublicId) {
        await cloudinary.uploader.destroy(blog.imagePublicId);
      }

      const { url, public_id } = await this.cloudinaryService.uploadImage(
        imageBuffer,
        'blogs',
      );
      updateBlogDto.imageUrl = url;
      updateBlogDto.imagePublicId = public_id;
    }

    const updatedBlog = await this.blogModel.findByIdAndUpdate(
      id,
      updateBlogDto,
      {
        new: true,
        runValidators: true,
        omitUndefined: true,
      },
    );

    if (!updatedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    return updatedBlog;
  }

  async list(filterDto: BlogFilterDto) {
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
            { content: { $regex: search, $options: 'i' } },
            { shortDescription: { $regex: search, $options: 'i' } },
          ],
        }
      : {};
    const sortOptions: Record<string, 1 | -1> = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [total, data] = await Promise.all([
      this.blogModel.countDocuments(filter),
      this.blogModel
        .find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .exec(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async delete(id: string) {
    const blog = await this.blogModel.findById(id);
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    if (blog.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(blog.imagePublicId);
      } catch (error) {
        console.error('Cloudinary image deletion error:', error);
      }
    }

    await this.blogModel.findByIdAndDelete(id);

    return { message: 'Blog deleted successfully' };
  }
}
