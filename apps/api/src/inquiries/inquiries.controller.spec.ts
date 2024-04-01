import { Test, TestingModule } from '@nestjs/testing';
import { InquiriesController } from './inquiries.controller';
import { InquiriesService } from './inquiries.service';
import { PrismaService } from '@prisma_/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('InquiriesController', () => {
  let controller: InquiriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InquiriesController],
      providers: [InquiriesService, PrismaService, EventEmitter2],
    }).compile();

    controller = module.get<InquiriesController>(InquiriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
