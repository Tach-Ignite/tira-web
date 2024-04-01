import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandInput,
} from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';
import { SendEmailProps } from './email.interface';

@Injectable()
export class SESEmailService {
  private sesClient: SESClient;
  constructor(private config: ConfigService) {
    this.sesClient = new SESClient({
      region: this.config.getOrThrow('AWS_REGION'),
      credentials: {
        accessKeyId: this.config.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.config.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async sendEmail(emailProps: SendEmailProps) {
    const { from, to, body, subject, replyToEmail } = emailProps;
    const emailParams: SendEmailCommandInput = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: from,
    };

    if (replyToEmail) {
      emailParams['ReplyToAddresses'] = [replyToEmail];
    }
    let response;
    try {
      response = await this.sesClient.send(new SendEmailCommand(emailParams));
    } catch (e) {
      return new HttpException(
        `Failed to send email: ${response?.$metadata?.httpStatusCode}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.sesClient.destroy();
    return response;
  }
}
