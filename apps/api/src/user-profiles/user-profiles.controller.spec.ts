import { Test, TestingModule } from '@nestjs/testing';
import { UserProfilesController } from './user-profiles.controller';
import { UserProfilesService } from './user-profiles.service';
import { PrismaModule } from '@prisma_/prisma.module';
import { ConfigModule } from '@nestjs/config';

describe('UserProfilesController', () => {
  let controller: UserProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ConfigModule],
      controllers: [UserProfilesController],
      providers: [UserProfilesService],
    }).compile();

    controller = module.get<UserProfilesController>(UserProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
