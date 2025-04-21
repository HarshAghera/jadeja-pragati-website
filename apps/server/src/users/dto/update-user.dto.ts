import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
