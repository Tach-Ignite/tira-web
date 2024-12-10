import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { createPaginator } from 'prisma-pagination';
import { SearchPaginationDto } from '@common/dto/searchPagination.dto';
import { PrismaService } from '@prisma_/prisma.service';
import { TeamEntity } from './entities/team.entity';
import { Prisma } from '@prisma/client';
import { TeamUsersRolesEntity } from '@src/team-users/entities/team-user-roles.entity';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    page,
    perPage: perPageReq = '0',
    searchTerm = '',
  }: SearchPaginationDto) {
    const total = await this.prisma.teams.count({});
    const perPage = perPageReq === '0' ? total : perPageReq;
    const paginate = createPaginator({
      page,
      perPage,
    });

    return paginate<TeamEntity, Prisma.TeamsFindManyArgs>(
      this.prisma.teams,
      {
        orderBy: { createdAt: 'desc' },
        where: {
          name: { contains: searchTerm, mode: 'insensitive' },
        },
      },
      {
        page,
        perPage,
      },
    );
  }

  async findOne(
    userId: string,
    teamFriendlyId: string,
    teamUsersRoles: TeamUsersRolesEntity,
  ) {
    if (teamUsersRoles?.readAccess) {
      const team = this.prisma.teams.findUnique({
        where: { teamFriendlyId },
        include: {
          organization: {
            include: {
              orgUsers: {
                include: { role: true },
                where: {
                  userId,
                },
              },
              teams: {
                include: {
                  teamUsers: {
                    include: { role: true },
                    where: {
                      userId,
                    },
                  },
                },
                where: {
                  teamFriendlyId,
                },
              },
            },
          },
          teamUsers: true,
          _count: {
            select: {
              teamUsers: true, // Count the related teamUsers
            },
          },
        },
      });
      if (!team) {
        throw new NotFoundException(`Team with ID ${teamFriendlyId} not found`);
      }
      return team;
    } else {
      throw new HttpException(
        {
          data: null,
          message: 'No permission to access this team',
          status: HttpStatus.FORBIDDEN,
          error: 'FORBIDDEN',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async findByOrganizationId(
    organizationId: string,
    query: SearchPaginationDto,
  ) {
    const { page = 1, perPage: perPageReq = '0', searchTerm = '' } = query;
    const total = await this.prisma.teams.count({
      where: {
        orgId: organizationId,
        name: { contains: searchTerm, mode: 'insensitive' },
      },
    });

    const perPage = perPageReq === '0' ? total : perPageReq;

    const teamsWithCounts = await this.prisma.teams.findMany({
      orderBy: { name: 'asc' },
      where: {
        orgId: organizationId,
        name: { contains: searchTerm, mode: 'insensitive' },
      },
      include: {
        organization: true,
        teamUsers: true,
        _count: {
          select: {
            teamUsers: true, // Count the related teamUsers
          },
        },
      },
      skip: (Number(page) - 1) * Number(perPage),
      take: Number(perPage),
    });

    const results = teamsWithCounts.map((team) => ({
      ...team,
      teamUsersCount: team._count.teamUsers, // Add the count to the response
    }));

    return {
      meta: {
        total: total,
        currentPage: page,
        perPage,
      },
      data: results,
    };
  }
}
