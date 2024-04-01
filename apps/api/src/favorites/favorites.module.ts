import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { PrismaModule } from '@prisma_/prisma.module';
import { LoggerService } from '@common/logger/logger.service';

@Module({
  imports: [PrismaModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, LoggerService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
