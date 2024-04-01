import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@common/logger/logger.service';
import { SESEmailService } from './SES.email.service';
import { ConsoleEmailService } from './console.email.service';
import { SendEmailProps } from './email.interface';

@Injectable()
export class EmailService {
  private service: SESEmailService | ConsoleEmailService;
  constructor(
    private config: ConfigService,
    private logger: LoggerService,
  ) {
    this.service =
      this.config.getOrThrow('EMAIL_PROVIDER') === 'ses'
        ? new SESEmailService(this.config)
        : new ConsoleEmailService(this.logger);
  }

  async sendEmail(emailParams: SendEmailProps) {
    this.service.sendEmail(emailParams);
  }
}
