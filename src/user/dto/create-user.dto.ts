import { IsString, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username cannot be empty' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

  uuid?: string;

  email?: string;

  name?: string;

  birthday?: string;

  gender?: string;

  horospace?: string;

  zodiac?: string;

  height?: number;

  weight?: number;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username cannot be empty' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
  
  uuid?: string;
  
  email?: string;

  name?: string;

  birthday?: string;

  gender?: string;

  horospace?: string;

  zodiac?: string;

  height?: number;

  weight?: number;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username cannot be empty' })
  username?: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password?: string;

  email?: string;

  name?: string;

  birthday?: string;

  gender?: string;

  horospace?: string;

  zodiac?: string;

  height?: number;

  weight?: number;
}
