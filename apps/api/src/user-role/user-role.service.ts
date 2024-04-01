import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { PrismaService } from '@prisma_/prisma.service';
import { LoggerService } from '@common/logger/logger.service';

@Injectable()
export class UserRoleService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}
  async create(createUserRoleDto: CreateUserRoleDto) {
    return await this.prisma.userRoles.create({
      data: { ...createUserRoleDto },
    });
  }

  findAll() {
    return this.prisma.userRoles.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} userRole`;
  }
}
