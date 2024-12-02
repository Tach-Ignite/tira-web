import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma_/prisma.service';

@Injectable()
export class TeamUsersService {
  constructor(private prisma: PrismaService) {}

  async getTeamUserByTeamUserId(teamId: string, userId: string) {
    const teamUser = this.prisma.teamUsers.findUnique({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });
    if (!teamUser) {
      throw new NotFoundException(`Team User with ID ${userId} not found`);
    }
    return teamUser;
  }

  async removeUser(userId: string, teamId: string) {
    const teamUser = await this.prisma.teamUsers.delete({
      where: {
        teamId_userId: {
          userId,
          teamId,
        },
      },
    });

    if (!teamUser) {
      throw new NotFoundException(`Team User with ID ${userId} not found`);
    }
    return teamUser;
  }
}
