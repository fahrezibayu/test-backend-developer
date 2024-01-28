import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RabbitMQModule  } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/test-backend'),
    JwtModule.register({
      secret: 'testing-api-backend',
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    UserModule,
    RabbitMQModule 
  ],
})
export class AppModule {}
