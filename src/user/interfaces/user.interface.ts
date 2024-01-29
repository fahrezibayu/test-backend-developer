import { Document } from 'mongoose';

export interface User extends Document {
  uuid: string;
  username: string;
  password: string;
  email: string;
  name: string;
  gender: string;
  birthday: string;
  horoscope: string;
  zodiac: string;
  height: number;
  weight: number;
  interests: string[];
  profilePicture: string;
}
