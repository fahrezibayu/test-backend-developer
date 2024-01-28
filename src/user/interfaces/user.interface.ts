// interfaces/user.interface.ts
import { Document } from 'mongoose';

export interface User extends Document {
  uuid: string;
  username: string;
  password: string;
  email: string;
  name: string;
  gender: string;
  birthday: string;
  horospace: string;
  zodiac: string;
  height: number;
  weight: number;
}
