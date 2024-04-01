import { Injectable } from '@nestjs/common';
import { LoggerService } from '@common/logger/logger.service';
import { SendEmailProps } from './email.interface';

@Injectable()
export class ConsoleEmailService {
  constructor(private logger: LoggerService) {}

  sendEmail(emailProps: SendEmailProps) {
    const { from, to, body, subject, replyToEmail } = emailProps;
    // eslint-disable-next-line no-console
    this.logger.log(
      `Sending email from ${from} to ${to} with subject ${subject} and body ${body} and replyToEmail ${replyToEmail}`,
    );
  }
}
