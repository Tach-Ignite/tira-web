import { Injectable, LoggerService as NsLogger } from '@nestjs/common';
import { Logger, LoggerInterface } from 'logger';

@Injectable()
export class LoggerService implements NsLogger {
  private logger: LoggerInterface;
  constructor() {
    this.logger = new Logger('BE-Nest', {
      level: 'info',
      cloudwatchEnabled: process.env.LOGGER_SERVICE === 'cloudwatch',
    }).create();
  }

  log(message: string, ...optionalParams: any[]) {
    this.logger.info(message, optionalParams);
  }

  error(message: string, ...optionalParams: any[]) {
    this.logger.error(message, optionalParams);
  }

  warn(message: string, ...optionalParams: any[]) {
    this.logger.warn(message, optionalParams);
  }

  debug?(message: string, ...optionalParams: any[]) {
    this.logger.debug(message, optionalParams);
  }

  verbose?(message: string, ...optionalParams: any[]) {
    this.logger.verbose(message, optionalParams);
  }
}
