import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as bcrypt from 'bcryptjs';

interface MongoDuplicateKeyError {
  code?: number;
  keyPattern?: {
    email?: number;
  };
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Oops, something went wrong');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find();
    } catch {
      throw new InternalServerErrorException('Oops something went wrong');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );

      const createdUser = new this.userModel({
        email: createUserDto.email,
        password: hashedPassword,
        type: createUserDto.type,
      });
      return await createdUser.save();
    } catch (error) {
      const err = error as MongoDuplicateKeyError;

      if (err.code === 11000 && err.keyPattern?.email) {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('Oops something went wrong');
    }
  }

  async updatePassword(updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email: updateUserDto.email });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);

      user.password = hashedPassword;
      await user.save();

      return user;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Failed to update password');
    }
  }

  async delete(id: string) {
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.userModel.deleteOne({ _id: id });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Oops, something went wrong');
    }
  }
}
