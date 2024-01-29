import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String })
  uuid: string;

  @Prop({ type: String, unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  gender: string;

  @Prop({ type: String })
  birthday: string;

  @Prop({ type: String })
  horoscope: string;

  @Prop({ type: String })
  zodiac: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop({ type: [String], default: [] })
  interests: string[];

  @Prop({ type: String })
  profilePicture: string;
}
export const UserSchema = SchemaFactory.createForClass(User);