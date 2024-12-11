import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '@prisma_/prisma.service';
import { UpdateTeamUserRoleDto } from './dto/update-team-user-role.dto';
import { Roles } from '../utils/roles.enums';
import { TeamUserSearchPaginationDto } from './dto/search-team-user.dto';
import { TeamUsersRolesEntity } from './entities/team-user-roles.entity';

@Injectable()
export class TeamUsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    query: TeamUserSearchPaginationDto,
    teamUsersRoles: TeamUsersRolesEntity,
  ) {
    const {
      page,
      perPage: perPageReq = '0',
      searchTerm = '',
      teamId = '',
    } = query;

    if (!teamUsersRoles?.readAccess) {
      throw new HttpException(
        {
          data: null,
          message: 'No permission to access this resource',
          status: HttpStatus.FORBIDDEN,
          error: 'FORBIDDEN',
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      const totalUsers = await this.prisma.teamUsers.count({
        where: {
          teamId,
          OR: [
            {
              OR: [
                {
                  users: {
                    userProfile: {
                      firstName: { contains: searchTerm, mode: 'insensitive' },
                    },
                  },
                },
                {
                  users: {
                    userProfile: {
                      lastName: { contains: searchTerm, mode: 'insensitive' },
                    },
                  },
                },
              ],
            },
            { users: { email: { contains: searchTerm, mode: 'insensitive' } } },
          ],
        },
      });

      const perPage =
        perPageReq === '0' ? totalUsers : parseInt(perPageReq, 10);
      const skip = (Number(page) - 1) * perPage;

      const teamUsers = await this.prisma.teamUsers.findMany({
        include: {
          users: true,
          role: true,
        },
        where: {
          teamId,
          OR: [
            {
              OR: [
                {
                  users: {
                    userProfile: {
                      firstName: { contains: searchTerm, mode: 'insensitive' },
                    },
                  },
                },
                {
                  users: {
                    userProfile: {
                      lastName: { contains: searchTerm, mode: 'insensitive' },
                    },
                  },
                },
              ],
            },
            { users: { email: { contains: searchTerm, mode: 'insensitive' } } },
          ],
        },
        skip,
        take: perPage,
      });

      return {
        meta: {
          total: totalUsers,
          currentPage: page,
          perPage,
        },
        data: teamUsers,
        currentUser: teamUsersRoles,
      };
    }
  }

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

  async roleUpdate(
    userId: string,
    orgId: string,
    teamId: string,
    teamUsersRoles: TeamUsersRolesEntity,
    updateTeamUserRoleDto: UpdateTeamUserRoleDto,
  ) {
    if (!teamUsersRoles?.writeAccess) {
      throw new HttpException(
        {
          data: null,
          message: 'No permission to access this organization resources',
          status: HttpStatus.FORBIDDEN,
          error: 'FORBIDDEN',
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      const { role } = updateTeamUserRoleDto;
      if (role === Roles.TEAM_ADMIN || role === Roles.TEAM_MEMBER) {
        const teamUser = await this.prisma.teamUsers.findFirst({
          where: {
            userId: userId,
            teamId: teamId,
          },
        });
        if (!teamUser?.id) {
          throw new NotFoundException(`User not found in this team`);
        }
        const roleData = await this.prisma.userRoles.findFirst({
          where: {
            name: role,
          },
        });
        if (!roleData?.id) {
          throw new NotFoundException(`Role not found.`);
        }
        return this.prisma.teamUsers.update({
          where: { id: teamUser?.id },
          data: { roleId: roleData?.id },
        });
      } else if (role === 'remove') {
        return await this.removeUser(userId, teamId);
      } else {
        throw new NotFoundException(`Role not found for assignment`);
      }
    }
  }
}
