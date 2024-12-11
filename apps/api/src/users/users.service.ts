import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginator } from 'prisma-pagination';
import { PrismaService } from '@prisma_/prisma.service';
import { SearchPaginationDto } from '@common/dto/searchPagination.dto';
import { LoggerService } from '@common/logger/logger.service';
import { Prisma } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminConsoleUserDto } from './dto/admin-console-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from '@src/utils/roles.enums';
import { UpdateAnyUserDto } from './dto/update-any-user.dto';

const profileReturnProperty = {
  email: true,
  userId: true,
  phoneNumber: true,
};

const userProfileReturnProperty = {
  firstName: true,
  lastName: true,
  profileImageUrl: true,
};

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.prisma.users.create({
      data: { ...createUserDto, userProfile: { create: {} } },
      include: {
        role: true,
        userProfile: true,
      },
    });
  }

  async findAll({ page, perPage, searchTerm = '' }: SearchPaginationDto) {
    const paginate = createPaginator({
      page,
      perPage,
    });

    return paginate<UserEntity, Prisma.UsersFindManyArgs>(
      this.prisma.users,
      {
        orderBy: { createdAt: 'desc' },
        include: { role: true, userProfile: true },
        where: {
          OR: [
            {
              OR: [
                {
                  userProfile: {
                    firstName: { contains: searchTerm, mode: 'insensitive' },
                  },
                },
                {
                  userProfile: {
                    lastName: { contains: searchTerm, mode: 'insensitive' },
                  },
                },
              ],
            },
            {
              email: { contains: searchTerm, mode: 'insensitive' },
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

  async findOne(userId: string, isProfile?: boolean) {
    let user;
    if (isProfile) {
      user = await this.prisma.users.findUnique({
        where: { userId },
        select: {
          ...profileReturnProperty,
          role: true,
          userProfile: {
            select: {
              ...userProfileReturnProperty,
            },
          },
        },
      });
    } else {
      user = await this.prisma.users.findUnique({
        where: { userId },
        include: {
          role: true,
          userProfile: true,
          orgUsers: {
            include: {
              organizations: true,
              role: true,
            },
          },
          teamUsers: {
            include: {
              role: true,
              team: {
                include: {
                  organization: true,
                },
              },
            },
          },
        },
      });
    }
    if (!user?.userId) {
      this.logger.warn('User with ${userId} does not exist.');
      throw new NotFoundException(`User with ${userId} does not exist.`);
    }

    return user;
  }

  async getUser(filter: Prisma.UsersWhereUniqueInput): Promise<UserEntity> {
    return await this.prisma.users.findUniqueOrThrow({
      where: filter,
      include: {
        role: true,
        userProfile: true,
      },
    });
  }

  async deleteUser(userId: string) {
    const user = await this.prisma.users.findFirstOrThrow({
      where: { userId: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ${userId} does not exist.`);
    }

    return await this.prisma.users.delete({
      where: { userId: userId },
    });
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
    isProfile?: boolean,
  ) {
    if (isProfile) {
      return await this.prisma.users.update({
        where: { userId },
        data: updateUserDto,
        select: profileReturnProperty,
      });
    } else {
      return await this.prisma.users.update({
        where: { userId },
        data: updateUserDto,
      });
    }
  }

  async remove(userId: string) {
    return await this.prisma.users.delete({ where: { userId } });
  }

  async getTotalUsers() {
    return await this.prisma.users.count();
  }

  async getUserRoles(userId: string, orgId: string) {
    let user;
    if (orgId) {
      user = await this.prisma.users.findUnique({
        where: { userId },
        include: {
          userProfile: true,
          role: true,
          orgUsers: {
            where: {
              orgId: orgId,
            },
            include: {
              organizations: true,
              role: true,
            },
          },
          teamUsers: {
            where: {
              team: {
                orgId: orgId,
              },
            },
            include: {
              role: true,
              team: {
                include: {
                  organization: true,
                },
              },
            },
          },
        },
      });
    } else {
      user = await this.prisma.users.findUnique({
        where: { userId },
        include: {
          userProfile: true,
          role: true,
          orgUsers: {
            include: {
              organizations: true,
              role: true,
            },
          },
        },
      });
    }
    if (!user?.userId) {
      this.logger.warn('User with ${userId} does not exist.');
      throw new NotFoundException(`User with ${userId} does not exist.`);
    }

    return user;
  }

  async getAllUsersInOrg({
    page,
    perPage = '10',
    searchTerm = '',
    orgId,
  }: AdminConsoleUserDto) {
    const paginate = createPaginator({
      page,
      perPage,
    });

    return paginate<UserEntity, Prisma.UsersFindManyArgs>(
      this.prisma.users,
      {
        orderBy: { createdAt: 'desc' },
        include: {
          orgUsers: {
            include: {
              role: true,
              organizations: true,
            },
          },
          role: true,
          userProfile: {
            select: {
              fullName: true,
              linkedInURL: true,
              websiteURL: true,
            },
          },
        },
        where: {
          orgUsers: {
            some: { orgId: orgId },
          },
          OR: [
            {
              OR: [
                {
                  userProfile: {
                    firstName: { contains: searchTerm, mode: 'insensitive' },
                  },
                },
                {
                  userProfile: {
                    lastName: { contains: searchTerm, mode: 'insensitive' },
                  },
                },
              ],
            },
            {
              email: { contains: searchTerm, mode: 'insensitive' },
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

  async getAllUsersInTeam({
    page,
    perPage = '10',
    searchTerm = '',
    teamId,
  }: AdminConsoleUserDto) {
    const paginate = createPaginator({
      page,
      perPage,
    });

    return paginate<UserEntity, Prisma.UsersFindManyArgs>(
      this.prisma.users,
      {
        orderBy: { createdAt: 'desc' },
        include: {
          teamUsers: {
            include: {
              role: true,
              team: true,
            },
          },
          role: true,
          userProfile: {
            select: {
              fullName: true,
              linkedInURL: true,
              websiteURL: true,
            },
          },
        },
        where: {
          teamUsers: {
            some: { teamId: teamId },
          },
          OR: [
            {
              OR: [
                {
                  userProfile: {
                    firstName: { contains: searchTerm, mode: 'insensitive' },
                  },
                },
                {
                  userProfile: {
                    lastName: { contains: searchTerm, mode: 'insensitive' },
                  },
                },
              ],
            },
            {
              email: { contains: searchTerm, mode: 'insensitive' },
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

  async updateAnyUser(userId: string, data: UpdateAnyUserDto) {
    const { userProfile } = data || {};
    return await this.prisma.users.update({
      where: { userId },
      data: {
        userStatus: data.userStatus,
        userProfile: {
          update: { data: userProfile },
        },
      },
      select: {
        email: true,
        role: true,
        userId: true,
        userType: true,
        userStatus: true,
        userProfile: true,
      },
    });
  }

  async updateUserRole(updateRoleDto: UpdateRoleDto, currentUserId: string) {
    const { orgId, teamId, userId, roleId } = updateRoleDto || {};

    const currentUser = await this.prisma.users.findUnique({
      where: { userId: currentUserId },
      include: { role: true },
    });

    const selectedRole = await this.prisma.userRoles.findUnique({
      where: { id: roleId },
    });

    const { name: selectedRoleName } = selectedRole || {};

    const selectedUser = await this.prisma.users.findUnique({
      where: { userId },
      include: { role: true },
    });

    const { name: currentUserRole } = currentUser?.role || {};

    const { name: selectedUserRole } = selectedUser?.role || {};

    if (orgId) {
      if (
        currentUserRole === Roles.SUPER_ADMIN ||
        currentUserRole === Roles.SYSTEM_ADMIN ||
        currentUserRole === Roles.ORG_ADMIN
      ) {
        if (
          selectedRoleName === Roles.ORG_MEMBER ||
          selectedRoleName === Roles.ORG_ADMIN
        ) {
          return this.prisma.orgUsers.update({
            where: { orgId_userId: { orgId, userId } },
            data: { roleId },
            include: { role: true },
          });
        } else throw new NotFoundException('Unable to update the Role');
      } else throw new NotFoundException('Unable to update the Role');
    } else if (teamId) {
      if (
        currentUserRole === Roles.SUPER_ADMIN ||
        currentUserRole === Roles.SYSTEM_ADMIN ||
        currentUserRole === Roles.ORG_ADMIN ||
        currentUserRole === Roles.TEAM_ADMIN
      ) {
        if (
          selectedRoleName === Roles.TEAM_ADMIN ||
          selectedRoleName === Roles.TEAM_MEMBER
        ) {
          return this.prisma.teamUsers.update({
            where: {
              teamId_userId: {
                teamId,
                userId,
              },
            },
            data: { roleId },
            include: { role: true },
          });
        } else throw new NotFoundException('Unable to update the Role');
      } else throw new NotFoundException('Unable to update the Role');
    } else {
      if (currentUserRole === Roles.USER) {
        throw new NotFoundException('User cannot be able to update the Role');
      } else if (currentUserRole === Roles.SYSTEM_ADMIN) {
        if (selectedUserRole !== Roles.SUPER_ADMIN) {
          return this.prisma.users.update({
            where: { userId },
            data: { roleId },
            include: { role: true },
          });
        } else throw new NotFoundException('Unable to update the Role');
      } else
        return this.prisma.users.update({
          where: { userId },
          data: { roleId },
          include: { role: true },
        });
    }
  }
}
