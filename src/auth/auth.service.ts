import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto, RegisterUserDto, LoginUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/interfaces/user.interface';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,private readonly jwtService: JwtService) { }
  private blacklistedTokens: string[] = [];
  async register(RegisterUserDto: RegisterUserDto): Promise<User> {
    const existingUser = await this.userService.findUserByUsername(RegisterUserDto.username);

    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(RegisterUserDto.password, 10);
    
    const userId = uuidv4();
    const user: User = await this.userService.registerUser({
      uuid: userId,
      username: RegisterUserDto.username,
      password: hashedPassword,
      email: RegisterUserDto.email,
      name: '',
      gender: '',
      birthday: '',
      horoscope: '',
      zodiac: '',
      height: 0,
      weight: 0,
      interests: [],
      profilePicture: ''
    });

    return user;
  }


  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userService.findUserByUsernameOrEmail(loginUserDto.usernameOrEmail);

    if (!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign({ username: user.username, sub: user._id }, 'testing-api-backend', { expiresIn: '1h' });

    return { message: 'Login berhasil', token };
  }

  async generateJwtToken(user: { username: string; password: string }): Promise<string> {
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

  addToBlacklist(token: string): void {
    this.blacklistedTokens.push(token);
  }

  isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.includes(token);
  }
}
