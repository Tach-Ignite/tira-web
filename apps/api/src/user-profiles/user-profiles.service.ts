import { Injectable } from '@nestjs/common';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { PrismaService } from '@prisma_/prisma.service';

@Injectable()
export class UserProfilesService {
  constructor(private prisma: PrismaService) { }
  async update(userId: string, data: Partial<UpdateUserProfileDto>) {
    return this.prisma.userProfiles.upsert({
      where: { userId },
      create: { ...data, userId },
      update: { ...data },
      include: { user: true },
    });
  }

  async getUserProfile(userId: string) {
    return await this.prisma.userProfiles.findFirst({
      where: { userId },
      include: { user: true },
    });
  }
}
