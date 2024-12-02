import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginator } from 'prisma-pagination';
import { SearchPaginationDto } from '@common/dto/searchPagination.dto';
import { PrismaService } from '@prisma_/prisma.service';
import { TeamEntity } from './entities/team.entity';
import { Prisma } from '@prisma/client';

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

  async findOne(id: string) {
    const team = this.prisma.teams.findUnique({
      where: { id },
      include: {
        organization: true,
      },
    });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async findByOrganizationId(
    organizationId: string,
    query: SearchPaginationDto,
  ) {
    const { page = 1, perPage: perPageReq = '0', searchTerm = '' } = query;
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
          orgId: organizationId,
          name: { contains: searchTerm, mode: 'insensitive' },
        },
        include: {
          organization: true,
        },
      },
      {
        page,
        perPage,
      },
    );
  }
}
