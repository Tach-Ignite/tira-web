import { Test, TestingModule } from '@nestjs/testing';
import { InvitesService } from './invites.service';
import { EmailService } from '@src/email/email.service';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@common/logger/logger.service';
import { PrismaModule } from '@prisma_/prisma.module';

describe('InvitesService', () => {
  let service: InvitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitesService, EmailService, ConfigService, LoggerService],
      imports: [PrismaModule],
    }).compile();

    service = module.get<InvitesService>(InvitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
