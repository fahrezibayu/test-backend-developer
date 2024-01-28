import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards,ValidationPipe,UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface'; // Pastikan diimpor dengan benar
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@UseGuards(AuthGuard)
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("createProfile")
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {

    const existingUser = await this.userService.findUserByUsername(createUserDto.username);

    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    const userId = uuidv4();
    const user: User = await this.userService.createUser({
      uuid: userId,
      username: createUserDto.username,
      password: hashedPassword,
      email: createUserDto.email,
      name: createUserDto.name,
      gender: createUserDto.gender,
      birthday: createUserDto.birthday,
      horoscope: createUserDto.horoscope,
      zodiac: createUserDto.zodiac,
      height: createUserDto.height,
      weight: createUserDto.weight,
      interests: createUserDto.interests
    });

    return user;
    
  }

  @Get("getProfile")
  async findAllUsers(): Promise<User[]> {
    console.log(this.userService.findAllUsers());
    
    return this.userService.findAllUsers();
  }

  @Get('getDetailProfile/:id')
  async findUserById(@Param('id') userId: string): Promise<User> {
    return this.userService.findUserById(userId);
  }

  @Put('updateProfile/:id')
  async updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);

    const user: User = await this.userService.updateUser(userId,{
      username: updateUserDto.username,
      password: hashedPassword,
      email: updateUserDto.email,
      name: updateUserDto.name,
      gender: updateUserDto.gender,
      birthday: updateUserDto.birthday,
      horoscope: updateUserDto.horoscope,
      zodiac: updateUserDto.zodiac,
      height: updateUserDto.height,
      weight: updateUserDto.weight,
      interests: updateUserDto.interests
    });
    return user
  }

  @Delete('deleteProfile/:id')
  async deleteUser(@Param('id') userId: string): Promise<User> {
    return this.userService.deleteUser(userId);
  }
}
