import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './user.model';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { storage } from '../../multer.config';

@Module({
  imports: [
    JwtModule.register({
      secret: 'testing-api-backend',
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AuthModule,
    MulterModule.register({
      storage
    }),
  ],
  controllers: [UserController],
  providers: [UserService,AuthGuard],
})
export class UserModule {}
