// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [JwtModule.register({
    secret: 'your-secret-key',
    signOptions: { expiresIn: '1d' },
  }), MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [AuthService, UserService,AuthGuard],
  controllers: [AuthController],
})
export class AuthModule { }
