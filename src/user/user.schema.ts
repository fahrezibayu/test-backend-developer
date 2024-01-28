import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  uuid: {type: String, required: true},
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: false },
  gender: { type: String, required: false },
  birthday: { type: String, required: false },
  horospace: { type: String, required: false },
  zodiac: { type: String, required: false },
  height: { type: Number, required: false },
  weight: { type: Number, required: false },
});
