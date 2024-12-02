import { Module } from '@nestjs/common';
import { OrgUsersService } from './org-users.service';
import { OrgUsersController } from './org-users.controller';
import { PrismaModule } from '@prisma_/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrgUsersController],
  providers: [OrgUsersService],
})
export class OrgUsersModule {}
