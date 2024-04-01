import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from '@common/logger/logger.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorators/public.decorators';

@ApiTags('Default')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }
}
