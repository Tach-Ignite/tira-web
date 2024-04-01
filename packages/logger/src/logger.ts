// Logger Service
import { createLogger, format, transports } from 'winston';
import { ILoggerConfig, LoggerInterface } from './interface';
import { WinstonLogger } from './winston';
import WinstonCloudWatch from 'winston-cloudwatch';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: [path.resolve('../../.env.secrets.local')],
});

dotenv.config({
  path: [path.resolve('../../.env.local')],
});

export class Logger {
  private name: string;
  private config?: ILoggerConfig;
  constructor(name: string, config?: ILoggerConfig) {
    this.name = name;
    this.config = config;
  }

  create(): LoggerInterface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transportServices: any = [new transports.Console()];
    if (this.config?.cloudwatchEnabled) {
      transportServices.push(
        new WinstonCloudWatch({
          logGroupName: `${process.env.APP_STAGE || 'dev'}_${this.name}`,
          logStreamName: `${new Date().toLocaleDateString()}/${this.name}`,
          awsRegion: process.env.AWS_REGION,
          awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
          awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
        }),
      );
    }
    return new WinstonLogger(
      createLogger({
        level: this.config?.level || 'info',
        format: format.combine(format.json(), format.timestamp()),
        transports: transportServices,
      }),
      this.name,
    );
  }
}
