import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQController } from './rabbitmq.controller';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGuard } from '../auth/auth.guard';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    JwtModule.register({
      secret: 'testing-api-backend',
      signOptions: { expiresIn: '1d' },
    }),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RABBITMQ_HOST || 'localhost'}:5672`],
        },
      },
    ]),
    AuthModule
  ],
  providers: [RabbitMQService, AuthGuard],
  exports: [RabbitMQService],
  controllers: [RabbitMQController],
})
export class RabbitMQModule {}
