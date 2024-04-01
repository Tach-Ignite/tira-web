import { Test, TestingModule } from '@nestjs/testing';
import { AdminNotificationsService } from './admin-notifications.service';
import { PrismaService } from '@prisma_/prisma.service';
import { LoggerService } from '@common/logger/logger.service';

describe('AdminNotificationsService', () => {
  let service: AdminNotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminNotificationsService, PrismaService, LoggerService],
    }).compile();

    service = module.get<AdminNotificationsService>(AdminNotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
