import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '@prisma_/prisma.service';
import { Roles } from '../../utils/roles.enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(PrismaService) private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles =
      this.reflector.get<Roles[]>('roles', context.getHandler()) ||
      this.reflector.get<Roles[]>('roles', context.getClass());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = await this.prisma.users.findFirstOrThrow({
      where: {
        OR: [
          { userId: { equals: request.user.userId } },
          { sub: { equals: request.user.sub } },
        ],
      },
      include: {
        role: true,
      },
    });

    const hasRole = roles.some((role) => user.role.name === role);

    if (!hasRole) {
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

    return true;
  }
}
