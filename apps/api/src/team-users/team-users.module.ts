import { Module } from '@nestjs/common';
import { TeamUsersService } from './team-users.service';
import { TeamUsersController } from './team-users.controller';
import { PrismaModule } from '@prisma_/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TeamUsersController],
  providers: [TeamUsersService],
})
export class TeamUsersModule {}
