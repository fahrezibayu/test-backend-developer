// user.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards,ValidationPipe,UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface'; // Pastikan diimpor dengan benar
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {

    const existingUser = await this.userService.findUserByUsername(createUserDto.username);

    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // Generate UUID
    const userId = uuidv4();
    const user: User = await this.userService.createUser({
      uuid: userId,
      username: createUserDto.username,
      password: hashedPassword,
      email: createUserDto.email,
      name: createUserDto.name,
      gender: createUserDto.gender,
      birthday: createUserDto.birthday,
      horospace: createUserDto.horospace,
      zodiac: createUserDto.zodiac,
      height: createUserDto.height,
      weight: createUserDto.weight,
    });

    return user;
    // return this.userService.createUser(createUserDto);
  }

  @Get()
  async findAllUsers(): Promise<User[]> {
    console.log(this.userService.findAllUsers());
    
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async findUserById(@Param('id') userId: string): Promise<User> {
    return this.userService.findUserById(userId);
  }

  @Put(':id')
  async updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);

    const user: User = await this.userService.updateUser(userId,{
      username: updateUserDto.username,
      password: hashedPassword,
      email: updateUserDto.email,
      name: updateUserDto.name,
      gender: updateUserDto.gender,
      birthday: updateUserDto.birthday,
      horospace: updateUserDto.horospace,
      zodiac: updateUserDto.zodiac,
      height: updateUserDto.height,
      weight: updateUserDto.weight,
    });
    return user
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<User> {
    return this.userService.deleteUser(userId);
  }
}
