import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { PrismaService } from '@prisma_/prisma.service';
import { UserEntity } from '@src/users/entities/user.entity';
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
    if (request.user?.userId || request.user.sub) {
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
  async (data: undefined, context: ExecutionContext): Promise<boolean> => {
    const request = context.switchToHttp().getRequest();
    const orgId = request.headers?.orgId;
    const userId = request?.user?.userId;
    if (!orgId || !userId) {
      return false;
    }
    const prismaService = request.prismaService as PrismaService;
    const orgUser = await prismaService.orgUsers.findUniqueOrThrow({
      where: {
        orgId_userId: {
          orgId: orgId,
          userId: userId,
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
      orgUser.role?.name === Roles.ORG_ADMIN ||
      orgUser?.users?.role?.name === Roles.SYSTEM_ADMIN ||
      orgUser?.users?.role?.name === Roles.SUPER_ADMIN
    ) {
      return true;
    }
    return false;
  },
);
