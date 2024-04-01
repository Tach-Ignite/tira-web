import { Test, TestingModule } from '@nestjs/testing';
import { InquiriesService } from './inquiries.service';
import { PrismaService } from '@prisma_/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('InquiriesService', () => {
  let service: InquiriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InquiriesService, PrismaService, EventEmitter2],
    }).compile();

    service = module.get<InquiriesService>(InquiriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
