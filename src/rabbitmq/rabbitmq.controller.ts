import { Controller, Post, Body,UseGuards } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('api')
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Post('send-message')
  async sendMessage(@Body() body: { queue: string; message: string }) {
    await this.rabbitMQService.sendMessage(body.queue, body.message);
    return {message:'Pesan berhasil disimpan!'};
  }

  @Post('view-message')
  async viewMessage(@Body() body: { queue: string }) {
    const message = await this.rabbitMQService.receiveMessage(body.queue);
    return {message:message} || {message:'Tidak ada pesan di antrian'};
  }
}
