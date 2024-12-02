import { Test, TestingModule } from '@nestjs/testing';
import { TeamUsersService } from './team-users.service';
import { PrismaModule } from '@prisma_/prisma.module';

describe('TeamUsersService', () => {
  let service: TeamUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamUsersService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<TeamUsersService>(TeamUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
