// rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQController } from './rabbitmq.controller';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices'; // Import ClientsModule dan Transport
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'testing-api-backend', // Ganti dengan kunci rahasia yang sesuai
      signOptions: { expiresIn: '1d' }, // Konfigurasi lainnya
    }),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RABBITMQ_HOST || 'localhost'}:5672`], // Ganti alamat RabbitMQ sesuai nama layanan di Docker Compose
        },
      },
    ]),
  ],
  providers: [RabbitMQService, AuthGuard],
  exports: [RabbitMQService],
  controllers: [RabbitMQController],
})
export class RabbitMQModule {}
