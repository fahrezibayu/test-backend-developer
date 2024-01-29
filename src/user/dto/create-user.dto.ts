import { IsString, IsNotEmpty, IsArray } from 'class-validator';

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

  horoscope?: string;

  zodiac?: string;

  height?: number;

  weight?: number;

  interests?: string[];
}

export class LoginUserDto {
 
  @IsString()
  @IsNotEmpty({ message: 'Username or email cannot be empty' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

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

  horoscope?: string;

  zodiac?: string;

  height?: number;

  weight?: number;

  interests?: string[];
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

  horoscope?: string;

  zodiac?: string;

  height?: number;

  weight?: number;

  interests?: string[];
}
