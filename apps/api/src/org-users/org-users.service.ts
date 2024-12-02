import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginator } from 'prisma-pagination';
import { PrismaService } from '@prisma_/prisma.service';
import { Prisma } from '@prisma/client';
import { OrgUserSearchPaginationDto } from './dto/search-org-user.dto';
import { OrgUsersEntity } from './entities/org-user.entity';

@Injectable()
export class OrgUsersService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    page,
    perPage: perPageReq = '0',
    searchTerm = '',
    orgId = '',
  }: OrgUserSearchPaginationDto) {
    const total = await this.prisma.orgUsers.count({
      where: {
        orgId: {
          equals: orgId,
        },
      },
    });
    const perPage = perPageReq === '0' ? total : perPageReq;
    const paginate = createPaginator({
      page,
      perPage,
    });

    return paginate<OrgUsersEntity, Prisma.OrgUsersFindManyArgs>(
      this.prisma.orgUsers,
      {
        include: {
          users: true,
          role: true,
        },
        where: {
          orgId: { equals: orgId },
          OR: [
            {
              users: {
                name: { contains: searchTerm, mode: 'insensitive' },
              },
            },
            {
              users: { email: { contains: searchTerm, mode: 'insensitive' } },
            },
          ],
        },
      },
      {
        page,
        perPage,
      },
    );
  }

  async findOne(userId: string, orgId: string) {
    const orgUser = this.prisma.orgUsers.findUnique({
      where: {
        orgId_userId: {
          orgId,
          userId,
        },
      },
    });
    if (!orgUser) {
      throw new NotFoundException(`Org User with ID ${userId} not found`);
    }
    return orgUser;
  }

  async removeUser(userId: string, orgId: string) {
    const orgUser = await this.prisma.orgUsers.delete({
      where: {
        orgId_userId: {
          userId,
          orgId,
        },
      },
    });
    await this.prisma.teamUsers.deleteMany({
      where: {
        team: {
          orgId,
        },
        userId: userId,
      },
    });
    if (!orgUser) {
      throw new NotFoundException(`Org User with ID ${userId} not found`);
    }
    return orgUser;
  }
}
