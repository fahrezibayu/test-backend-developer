import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMQService } from './rabbitmq.service';

describe('RabbitMQService', () => {
  let service: RabbitMQService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitMQService],
    }).compile();

    service = module.get<RabbitMQService>(RabbitMQService);
    await service.onModuleInit();
  });

  it('should send a message to RabbitMQ', async () => {
    const queue = 'test_queue';
    const message = 'Hello, RabbitMQ!';

    await service.sendMessage(queue, message);

  });

  it('should receive a message from RabbitMQ', async () => {
    const queue = 'test_queue';
    const message = 'Hello, RabbitMQ!';
    await service.sendMessage(queue, message);

    const receivedMessage = await service.receiveMessage(queue);

    expect(receivedMessage).toEqual(message);
  });
});
