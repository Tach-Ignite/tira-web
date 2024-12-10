import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// import { createPaginator } from 'prisma-pagination';
import { PrismaService } from '@prisma_/prisma.service';
// import { Prisma } from '@prisma/client';
import { OrgUserSearchPaginationDto } from './dto/search-org-user.dto';
import { UpdateOrgUserRoleDto } from './dto/update-org-user-role';
import { Roles } from '../utils/roles.enums';
// import { OrgUsersEntity } from './entities/org-user.entity';

@Injectable()
export class OrgUsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: OrgUserSearchPaginationDto, isOrgDataAccess: boolean) {
    const {
      page,
      perPage: perPageReq = '0',
      searchTerm = '',
      orgId = '',
    } = query;

    if (!isOrgDataAccess) {
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
      const totalUsers = await this.prisma.orgUsers.count({
        where: {
          orgId,
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

      const orgUsers = await this.prisma.orgUsers.findMany({
        include: {
          users: {
            include: {
              teamUsers: true,
            },
          },
          role: true,
        },
        where: {
          orgId,
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

      const orgUsersWithTeamCount = await Promise.all(
        orgUsers.map(async (orgUser) => {
          const totalTeams = await this.prisma.teamUsers.count({
            where: {
              userId: orgUser.userId, // Get team count based on userId
              team: {
                orgId: orgId, // Ensure the team is part of the organization
              },
            },
          });

          return {
            ...orgUser,
            users: {
              ...orgUser.users,
              totalTeams, // Add the totalTeams count here
            },
          };
        }),
      );

      return {
        meta: {
          total: totalUsers,
          currentPage: page,
          perPage,
        },
        data: orgUsersWithTeamCount,
      };
    }
  }

  async findOne(userId: string, orgId: string, isOrgDataAccess: boolean) {
    if (!isOrgDataAccess) {
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
      const orgUser = this.prisma.orgUsers.findUnique({
        where: {
          orgId_userId: {
            orgId,
            userId,
          },
        },
        include: {
          users: {
            include: {
              userProfile: true,
              teamUsers: {
                include: {
                  team: true,
                  role: true,
                },
                where: {
                  team: {
                    orgId: orgId,
                  },
                },
              },
            },
          },
          role: true,
        },
      });
      if (!orgUser) {
        throw new NotFoundException(`Org User with ID ${userId} not found`);
      }
      return orgUser;
    }
  }

  async removeUser(userId: string, orgId: string, isOrgDataAccess: boolean) {
    if (!isOrgDataAccess) {
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

  async roleUpdate(
    userId: string,
    orgId: string,
    isOrgDataAccess: boolean,
    updateOrgUserRoleDto: UpdateOrgUserRoleDto,
  ) {
    if (!isOrgDataAccess) {
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
      const { role } = updateOrgUserRoleDto;
      if (role === Roles.ORG_ADMIN || role === Roles.ORG_MEMBER) {
        const orgUser = await this.prisma.orgUsers.findFirst({
          where: {
            userId: userId,
            orgId: orgId,
          },
        });
        if (!orgUser?.id) {
          throw new NotFoundException(`User not found in this organization`);
        }
        const roleData = await this.prisma.userRoles.findFirst({
          where: {
            name: role,
          },
        });
        if (!roleData?.id) {
          throw new NotFoundException(`Role not found.`);
        }
        return this.prisma.orgUsers.update({
          where: { id: orgUser?.id },
          data: { roleId: roleData?.id },
        });
      } else if (role === 'remove') {
        return await this.removeUser(userId, orgId, isOrgDataAccess);
      } else {
        throw new NotFoundException(`Role not found for assignment`);
      }
    }
  }
}
