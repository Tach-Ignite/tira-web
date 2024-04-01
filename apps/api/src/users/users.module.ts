import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '@prisma_/prisma.module';
import { LoggerService } from '@common/logger/logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, LoggerService, ConfigService],
  exports: [UsersService],
})
export class UsersModule {}
