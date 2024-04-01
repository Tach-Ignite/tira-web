import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { LoggerService } from '@common/logger/logger.service';
import { PrismaModule } from '@prisma_/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserRoleController],
  providers: [UserRoleService, LoggerService],
  exports: [UserRoleService],
})
export class UserRoleModule {}
