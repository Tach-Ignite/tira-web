import { Test, TestingModule } from '@nestjs/testing';
import { TeamUsersController } from './team-users.controller';
import { TeamUsersService } from './team-users.service';
import { PrismaModule } from '@prisma_/prisma.module';
import { ConfigModule } from '@nestjs/config';

describe('TeamUsersController', () => {
  let controller: TeamUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ConfigModule],
      controllers: [TeamUsersController],
      providers: [TeamUsersService],
    }).compile();

    controller = module.get<TeamUsersController>(TeamUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
