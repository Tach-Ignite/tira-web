import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  createParamDecorator,
} from '@nestjs/common';
import { PrismaService } from '@prisma_/prisma.service';
import { UserEntity } from '@src/users/entities/user.entity';
import { TeamUsersRolesEntity } from '@src/team-users/entities/team-user-roles.entity';
import { Roles } from '@src/utils/roles.enums';

const getCurrentUserByContext = (context: ExecutionContext) => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);

export const GetCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    return request.user.userId || request.user.sub;
  },
);

export const isSysAdmin = createParamDecorator(
  async (data: undefined, context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest();
    const prismaService = request.prismaService as PrismaService;

    let user: UserEntity;
    if (request.user?.userId || request?.user?.sub) {
      user = await prismaService.users.findUniqueOrThrow({
        where: { userId: request.user.userId || request.user.sub },
        include: {
          role: true,
        },
      });
    }

    if (
      user?.role.name === Roles.SUPER_ADMIN ||
      user?.role.name === Roles.SYSTEM_ADMIN
    ) {
      return true;
    }
    return false;
  },
);

export const isCurrentUserOrgAdmin = createParamDecorator(
  async (data: string, context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest();
    const orgFriendlyId = request.params?.[data];
    const userId = request?.user?.userId || request?.user?.sub;
    const prismaService = request.prismaService as PrismaService;
    if (!userId) {
      return false;
    }
    const currentUser = await prismaService.users.findUnique({
      where: {
        userId,
      },
      include: {
        role: true,
      },
    });
    if (
      currentUser &&
      (currentUser?.role?.name === Roles.SUPER_ADMIN ||
        currentUser?.role?.name === Roles.SYSTEM_ADMIN)
    ) {
      return true;
    }
    if (!orgFriendlyId) {
      return false;
    }
    const orgUser = await prismaService.orgUsers.findFirst({
      where: {
        userId: userId,
        organizations: {
          orgFriendlyId: orgFriendlyId,
        },
      },
      include: {
        role: true,
        users: {
          include: {
            role: true,
          },
        },
      },
    });
    if (
      orgUser?.role?.name === Roles.ORG_ADMIN ||
      orgUser?.users?.role?.name === Roles.SYSTEM_ADMIN ||
      orgUser?.users?.role?.name === Roles.SUPER_ADMIN
    ) {
      return true;
    } else {
      const org = await prismaService.organizations.findFirst({
        where: {
          orgFriendlyId: orgFriendlyId,
        },
      });
      if (!org) {
        throw new HttpException(
          {
            data: null,
            message: 'No organizations exist with this ID',
            status: HttpStatus.NOT_FOUND,
            error: 'NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          data: null,
          message: 'No permission to access this resource',
          status: HttpStatus.FORBIDDEN,
          error: 'FORBIDDEN',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  },
);

export const isCurrentUserHasOrgAccess = createParamDecorator(
  async (data: string, context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest();
    const orgFriendlyId = request.params?.[data];
    const userId = request?.user?.userId || request?.user?.sub;
    const prismaService = request.prismaService as PrismaService;
    if (!userId) {
      return false;
    }
    const currentUser = await prismaService.users.findUnique({
      where: {
        userId,
      },
      include: {
        role: true,
      },
    });
    if (
      currentUser &&
      (currentUser?.role?.name === Roles.SUPER_ADMIN ||
        currentUser?.role?.name === Roles.SYSTEM_ADMIN)
    ) {
      return true;
    }
    if (!orgFriendlyId) {
      return false;
    }
    const orgUser = await prismaService.orgUsers.findFirst({
      where: {
        userId: userId,
        organizations: {
          orgFriendlyId: orgFriendlyId,
        },
      },
      include: {
        role: true,
        users: {
          include: {
            role: true,
          },
        },
      },
    });
    if (
      orgUser?.role?.name === Roles.ORG_ADMIN ||
      orgUser?.role?.name === Roles.ORG_MEMBER ||
      orgUser?.users?.role?.name === Roles.SYSTEM_ADMIN ||
      orgUser?.users?.role?.name === Roles.SUPER_ADMIN
    ) {
      return true;
    } else {
      const org = await prismaService.organizations.findFirst({
        where: {
          orgFriendlyId: orgFriendlyId,
        },
      });
      if (!org) {
        throw new HttpException(
          {
            data: null,
            message: 'No organizations exist with this ID',
            status: HttpStatus.NOT_FOUND,
            error: 'NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          data: null,
          message: 'No permission to access this resource',
          status: HttpStatus.FORBIDDEN,
          error: 'FORBIDDEN',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  },
);

export const isCurrentUserHasOrgDataAccess = createParamDecorator(
  async (data: string, context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest();
    const orgId =
      request.params?.[data] || request.query?.[data] || request.body?.[data];
    const userId = request?.user?.userId || request?.user?.sub;
    const prismaService = request.prismaService as PrismaService;
    if (!userId) {
      return false;
    }
    const currentUser = await prismaService.users.findUnique({
      where: {
        userId,
      },
      include: {
        role: true,
      },
    });
    if (
      currentUser &&
      (currentUser?.role?.name === Roles.SUPER_ADMIN ||
        currentUser?.role?.name === Roles.SYSTEM_ADMIN)
    ) {
      return true;
    }
    if (!orgId) {
      return false;
    }
    const orgUser = await prismaService.orgUsers.findFirst({
      where: {
        userId: userId,
        organizations: {
          id: orgId,
        },
      },
      include: {
        role: true,
        users: {
          include: {
            role: true,
          },
        },
      },
    });
    if (orgUser?.role?.name === Roles.ORG_ADMIN) {
      return true;
    } else {
      const org = await prismaService.organizations.findUnique({
        where: {
          id: orgId,
        },
      });
      if (!org) {
        throw new HttpException(
          {
            data: null,
            message: 'No organizations exist with this ID',
            status: HttpStatus.NOT_FOUND,
            error: 'NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          data: null,
          message: 'No permission to access this organization',
          status: HttpStatus.FORBIDDEN,
          error: 'FORBIDDEN',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  },
);

export const currentUserTeamAccessByTeamFriendlyId = createParamDecorator(
  async (
    data: string,
    context: ExecutionContext,
  ): Promise<TeamUsersRolesEntity> => {
    const request = context.switchToHttp().getRequest();
    const teamFriendlyId =
      request.params?.[data] || request.query?.[data] || request.body?.[data];
    const userId = request?.user?.userId || request?.user?.sub;
    const prismaService = request.prismaService as PrismaService;
    const defaultRoleAccess = {
      readAccess: false,
      writeAccess: false,
    };
    if (!userId) {
      return defaultRoleAccess;
    }
    const currentUser = await prismaService.users.findUnique({
      where: {
        userId,
      },
      include: {
        role: true,
      },
    });
    if (
      currentUser &&
      (currentUser?.role?.name === Roles.SUPER_ADMIN ||
        currentUser?.role?.name === Roles.SYSTEM_ADMIN)
    ) {
      const roleAccess = {
        readAccess: true,
        writeAccess: true,
        role: currentUser?.role,
      };
      return roleAccess;
    }
    if (!teamFriendlyId) {
      return defaultRoleAccess;
    }
    const teamUser = await prismaService.teamUsers.findFirst({
      where: {
        userId,
        team: {
          teamFriendlyId,
        },
      },
      include: {
        role: true,
        users: {
          include: {
            role: true,
          },
        },
      },
    });
    if (
      teamUser?.role?.name === Roles.TEAM_ADMIN ||
      teamUser?.role?.name === Roles.TEAM_MEMBER
    ) {
      const roleAccess = {
        readAccess: true,
        writeAccess: teamUser?.role?.name === Roles.TEAM_ADMIN || false,
        role: teamUser?.role,
      };
      return roleAccess;
    } else {
      const teamData = await prismaService.teams.findUnique({
        where: {
          teamFriendlyId,
        },
      });
      if (!teamData) {
        throw new HttpException(
          {
            data: null,
            message: 'No team exist with this ID',
            status: HttpStatus.NOT_FOUND,
            error: 'NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      if (teamData?.orgId) {
        const orgUser = await prismaService.orgUsers.findFirst({
          where: {
            userId: userId,
            organizations: {
              id: teamData?.orgId,
            },
          },
          include: {
            role: true,
            users: {
              include: {
                role: true,
              },
            },
          },
        });
        if (orgUser?.role?.name === Roles.ORG_ADMIN) {
          const roleAccess = {
            readAccess: true,
            writeAccess: true,
            role: orgUser?.role,
          };
          return roleAccess;
        }
      }
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
  },
);

export const currentUserTeamAccess = createParamDecorator(
  async (
    data: string,
    context: ExecutionContext,
  ): Promise<TeamUsersRolesEntity> => {
    try {
      const request = context.switchToHttp().getRequest();
      const teamId =
        request.params?.[data] || request.query?.[data] || request.body?.[data];
      const userId = request?.user?.userId || request?.user?.sub;
      const prismaService = request.prismaService as PrismaService;
      const defaultRoleAccess = {
        readAccess: false,
        writeAccess: false,
      };
      if (!userId) {
        return defaultRoleAccess;
      }
      const currentUser = await prismaService.users.findUnique({
        where: {
          userId,
        },
        include: {
          role: true,
          teamUsers: {
            where: {
              userId,
            },
          },
        },
      });
      if (
        currentUser &&
        (currentUser?.role?.name === Roles.SUPER_ADMIN ||
          currentUser?.role?.name === Roles.SYSTEM_ADMIN)
      ) {
        const roleAccess = {
          readAccess: true,
          writeAccess: true,
          role: currentUser?.role,
        };
        return roleAccess;
      }
      if (!teamId) {
        return defaultRoleAccess;
      }
      const teamUser = await prismaService.teamUsers.findFirst({
        where: {
          userId,
          teamId,
        },
        include: {
          role: true,
          users: {
            include: {
              role: true,
            },
          },
        },
      });
      if (
        teamUser?.role?.name === Roles.TEAM_ADMIN ||
        teamUser?.role?.name === Roles.TEAM_MEMBER
      ) {
        const roleAccess = {
          readAccess: true,
          writeAccess: teamUser?.role?.name === Roles.TEAM_ADMIN || false,
          role: teamUser?.role,
        };
        return roleAccess;
      } else {
        const teamData = await prismaService.teams.findUnique({
          where: {
            id: teamId,
          },
        });
        if (!teamData) {
          throw new HttpException(
            {
              data: null,
              message: 'No team exist with this ID',
              status: HttpStatus.NOT_FOUND,
              error: 'NOT_FOUND',
            },
            HttpStatus.NOT_FOUND,
          );
        }
        if (teamData?.orgId) {
          const orgUser = await prismaService.orgUsers.findFirst({
            where: {
              userId: userId,
              organizations: {
                id: teamData?.orgId,
              },
            },
            include: {
              role: true,
              users: {
                include: {
                  role: true,
                },
              },
            },
          });
          if (orgUser?.role?.name === Roles.ORG_ADMIN) {
            const roleAccess = {
              readAccess: true,
              writeAccess: true,
              role: orgUser?.role,
            };
            return roleAccess;
          }
        }
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
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  },
);
