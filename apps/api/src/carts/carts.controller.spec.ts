import { Test, TestingModule } from '@nestjs/testing';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { PrismaService } from '@prisma_/prisma.service';
import { LoggerService } from '@common/logger/logger.service';

jest.mock('../../src/prisma/prisma.service');

describe('CartsController', () => {
  let controller: CartsController;
  let mockPrismaService: PrismaService;

  beforeEach(async () => {
    mockPrismaService = new PrismaService();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartsController],
      providers: [
        CartsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        LoggerService,
      ],
    }).compile();

    controller = module.get<CartsController>(CartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
