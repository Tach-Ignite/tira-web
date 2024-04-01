import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginator } from 'prisma-pagination';
import { PrismaService } from '@prisma_/prisma.service';
import { SearchPaginationDto } from '@common/dto/searchPagination.dto';
import { LoggerService } from '@common/logger/logger.service';
import { Prisma } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

const profileReturnProperty = {
  lastName: true,
  firstName: true,
  email: true,
  userId: true,
  phoneNumber: true,
  profileImage: true,
};

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.prisma.users.create({
      data: { ...createUserDto },
      include: {
        role: true,
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
        include: { role: true },
        where: {
          OR: [
            {
              name: { contains: searchTerm, mode: 'insensitive' },
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
        select: profileReturnProperty,
      });
    } else {
      user = await this.prisma.users.findUnique({
        where: { userId },
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
}
