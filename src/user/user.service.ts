import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model'; // Pastikan untuk mengimpor model User
import { CreateUserDto, UpdateUserDto, RegisterUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    const { username } = registerUserDto;
    const { email } = registerUserDto;
    
    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      throw new NotFoundException('Username already exists');
    }

    const existingUserEmail = await this.userModel.findOne({ email }).exec();
    if (existingUserEmail) {
      throw new NotFoundException('Email already exists');
    }


    const createdUser = new this.userModel(registerUserDto);
    return createdUser.save();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;
    const { email } = createUserDto;

    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      throw new NotFoundException('Username already exists');
    }

    const existingUserEmail = await this.userModel.findOne({ email }).exec();
    if (existingUserEmail) {
      throw new NotFoundException('Email already exists');
    }


    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
  
  async findUserById(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true }).exec();
  }

  async deleteUser(userId: string): Promise<User> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }
}
