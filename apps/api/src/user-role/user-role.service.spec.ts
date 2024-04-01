import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleService } from './user-role.service';
import { LoggerService } from '@common/logger/logger.service';
import { PrismaModule } from '@prisma_/prisma.module';

describe('UserRoleService', () => {
  let service: UserRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRoleService, LoggerService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<UserRoleService>(UserRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
