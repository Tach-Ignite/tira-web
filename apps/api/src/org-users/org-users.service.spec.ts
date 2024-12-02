import { Test, TestingModule } from '@nestjs/testing';
import { OrgUsersService } from './org-users.service';
import { PrismaModule } from '@prisma_/prisma.module';

describe('OrgUsersService', () => {
  let service: OrgUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrgUsersService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<OrgUsersService>(OrgUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
