import { Test, TestingModule } from '@nestjs/testing';
import { InvitesController } from './invites.controller';
import { InvitesService } from './invites.service';
import { PrismaModule } from '@prisma_/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from '@src/email/email.service';
import { LoggerService } from '@common/logger/logger.service';

describe('InvitesController', () => {
  let controller: InvitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ConfigModule],
      controllers: [InvitesController],
      providers: [InvitesService, EmailService, ConfigService, LoggerService],
    }).compile();

    controller = module.get<InvitesController>(InvitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
