import { Controller, Post, Body, ValidationPipe, Request, Res, HttpStatus, UseGuards  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../user/dto/create-user.dto';
import { Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<any> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise<any> {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Request() req, @Res() res: Response): Promise<void> {

    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      this.authService.addToBlacklist(token);
      res.status(HttpStatus.OK).json({ message: 'Logout successful' });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({ message: 'No token found in the request headers' });
    }
  }
}
