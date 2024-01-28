// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto, RegisterUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/interfaces/user.interface';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,private readonly jwtService: JwtService) { }

  async register(RegisterUserDto: RegisterUserDto): Promise<User> {
    const existingUser = await this.userService.findUserByUsername(RegisterUserDto.username);

    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(RegisterUserDto.password, 10);
    // Generate UUID
    const userId = uuidv4();
    const user: User = await this.userService.registerUser({
      uuid: userId,
      username: RegisterUserDto.username,
      password: hashedPassword,
      email: RegisterUserDto.email,
      name: '',
      gender: '',
      birthday: '',
      horospace: '',
      zodiac: '',
      height: 0,
      weight: 0,
    });

    return user;
  }


  async login(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.findUserByUsername(createUserDto.username);

    if (!user || !(await bcrypt.compare(createUserDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign({ username: user.username, sub: user._id }, 'testing-api-backend', { expiresIn: '1h' });

    // return { token };
    return { message: 'Login berhasil', token };
  }

  async generateJwtToken(user: { username: string; password: string }): Promise<string> {
    // const payload = { username: user.username, sub: user.password };
    return jwt.sign({ username: user.username, sub: user.password }, 'testing-api-backend', { expiresIn: '1h' });
  }

  async validateJwtToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verify(token, { secret: 'testing-api-backend' });
      return true;
    } catch (error) {
      return false;
    }
  }
}
