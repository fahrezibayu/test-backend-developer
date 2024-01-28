// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.model'; // Pastikan untuk mengimpor model User
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'testing-api-backend', // Ganti dengan kunci rahasia yang sesuai
      signOptions: { expiresIn: '1d' }, // Konfigurasi lainnya
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Sesuaikan dengan model dan skema Anda
  ],
  controllers: [UserController],
  providers: [UserService,AuthGuard],
})
export class UserModule {}
