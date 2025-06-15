import { IsString, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @ValidateIf(
    (o: Partial<CreateBlogDto>) =>
      typeof o.isPublished === 'boolean' || typeof o.isPublished === 'string',
  )
  isPublished?: string | boolean;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  imagePublicId?: string;
}
