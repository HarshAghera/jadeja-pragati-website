import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(['superAdmin', 'admin'])
  type: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
