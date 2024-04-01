import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from '@prisma_/prisma.module';
import { LoggerService } from '@common/logger/logger.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService, LoggerService],
  exports: [ProductsService],
})
export class ProductsModule {}
