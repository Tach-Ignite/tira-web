import { Test, TestingModule } from '@nestjs/testing';
import { AdminProfilesController } from './admin-profiles.controller';
import { AdminProfilesService } from './admin-profiles.service';
import { PrismaService } from '@prisma_/prisma.service';

describe('AdminProfilesController', () => {
  let controller: AdminProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminProfilesController],
      providers: [AdminProfilesService, PrismaService],
    }).compile();

    controller = module.get<AdminProfilesController>(AdminProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
