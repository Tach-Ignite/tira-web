import { Test, TestingModule } from '@nestjs/testing';
import { UserProfilesService } from './user-profiles.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@prisma_/prisma.module';
import { OrganizationsModule } from '@src/organizations/organizations.module';
// import { OrganizationsService } from '@src/organizations/organizations.service';

describe('UserProfilesService', () => {
  let service: UserProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ConfigModule, OrganizationsModule],
      providers: [UserProfilesService],
    }).compile();

    service = module.get<UserProfilesService>(UserProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
