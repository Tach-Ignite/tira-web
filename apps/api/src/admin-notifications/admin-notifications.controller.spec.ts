import { Test, TestingModule } from '@nestjs/testing';
import { AdminNotificationsController } from './admin-notifications.controller';
import { AdminNotificationsService } from './admin-notifications.service';
import { PrismaService } from '@prisma_/prisma.service';
import { LoggerService } from '@common/logger/logger.service';

describe('AdminNotificationsController', () => {
  let controller: AdminNotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminNotificationsController],
      providers: [AdminNotificationsService, PrismaService, LoggerService],
    }).compile();

    controller = module.get<AdminNotificationsController>(
      AdminNotificationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
