import { Module } from '@nestjs/common';
import { AdminProfilesService } from './admin-profiles.service';
import { AdminProfilesController } from './admin-profiles.controller';
import { PrismaModule } from '@prisma_/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminProfilesController],
  providers: [AdminProfilesService],
})
export class AdminProfilesModule {}
