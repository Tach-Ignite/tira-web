import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { PrismaModule } from '@prisma_/prisma.module';
import { LoggerService } from '@common/logger/logger.service';

@Module({
  imports: [PrismaModule],
  controllers: [CartsController],
  providers: [CartsService, LoggerService],
})
export class CartsModule {}
