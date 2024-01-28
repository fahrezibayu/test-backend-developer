// rabbitmq.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private channel: amqp.Channel;

  async onModuleInit() {
    // Ganti amqp://localhost:5672 menjadi amqp://rabbitmq:5672
    // const connection = await amqp.connect('amqp://rabbitmq:5672');
    // const connection = await amqp.connect('amqp://localhost:5672');
    const rabbitmqHost = process.env.RABBITMQ_HOST || 'localhost';
    const connection = await amqp.connect(`amqp://${rabbitmqHost}:5672`);
    this.channel = await connection.createChannel();
  }

  async sendMessage(queue: string, message: string) {
    await this.channel.assertQueue(queue, { durable: false });
    this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async receiveMessage(queue: string): Promise<string | null> {
    await this.channel.assertQueue(queue, { durable: false });
    const { content } = await this.channel.get(queue);
    if (content) {
      return content.toString();
    }
    return null;
  }
}
