import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { LoggerService } from '@common/logger/logger.service';
import { ConfigService } from '@nestjs/config';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService, LoggerService, ConfigService],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
