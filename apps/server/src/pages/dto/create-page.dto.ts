import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePageDto {
  @IsString() title: string;
  @IsString() slug: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() subcategory?: string;
  @IsOptional() @IsString() subsubcategory?: string;
  @IsOptional() @IsString() description?: string;
  @IsString() htmlContent: string;
  @IsOptional() @IsBoolean() showInNavbar?: boolean;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class PageListDto {
  @IsOptional() @IsString() category?: string;
}
