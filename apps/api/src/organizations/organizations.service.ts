import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createPaginator } from 'prisma-pagination';
import slugify from 'slugify';
import { randomBytes } from 'crypto';
import { PrismaService } from '@prisma_/prisma.service';
import { OrganizationEntity } from './entities/organization.entity';
import { Prisma } from '@prisma/client';
import { OrgSearchPagination } from './dto/orgSearchPagination.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Roles } from '@src/utils/roles.enums';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    { page, perPage: perPageReq = '0', searchTerm = '' }: OrgSearchPagination,
    userId: string,
    isSysAdmin: boolean,
  ) {
    const total = await this.prisma.organizations.count({});
    const perPage = perPageReq === '0' ? total : perPageReq;
    const paginate = createPaginator({
      page,
      perPage,
    });
    return paginate<OrganizationEntity, Prisma.OrganizationsFindManyArgs>(
      this.prisma.organizations,
      {
        orderBy: { createdAt: 'desc' },
        include: { orgUsers: { where: { userId }, include: { role: true } } },
        where: {
          AND: [
            {
              orgUsers: isSysAdmin
                ? undefined
                : {
                    some: { userId: userId },
                  },
            },
            {
              OR: [
                {
                  name: { contains: searchTerm, mode: 'insensitive' },
                },
                {
                  websiteURL: { contains: searchTerm, mode: 'insensitive' },
                },
              ],
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

  async findOne(id: string) {
    const organization = await this.prisma.organizations.findUnique({
      where: { id },
    });
    if (!organization?.id) {
      throw new NotFoundException(`Organization with ${id} does not exist.`);
    }

    return organization;
  }

  async findOneByOrgFriendlyId(userId: string, orgFriendlyId: string) {
    const organization = await this.prisma.organizations.findUnique({
      where: { orgFriendlyId },
      include: {
        orgUsers: {
          include: { role: true },
          where: {
            userId,
            organizations: { orgFriendlyId },
          },
        },
      },
    });
    if (!organization?.id) {
      throw new NotFoundException(
        `Organization with ${orgFriendlyId} does not exist.`,
      );
    }

    return organization;
  }

  async updateOrganization(
    orgFriendlyId: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ) {
    const organization = await this.prisma.organizations.findUnique({
      where: { orgFriendlyId },
    });

    if (!organization?.id) {
      throw new NotFoundException(
        `Organization with ${orgFriendlyId} does not exist.`,
      );
    }

    return this.prisma.organizations.update({
      where: { orgFriendlyId },
      data: { ...updateOrganizationDto },
    });
  }

  async createOrUpdate(name: string, website: string) {
    const orgFriendlyId = await this.generateUniqueOrgFriendlyId(name);

    return await this.prisma.organizations.upsert({
      where: {
        orgFriendlyId,
      },
      create: { name, websiteURL: website || '', orgFriendlyId },
      update: { name, websiteURL: website || '' },
      select: { name: true, id: true, websiteURL: true, orgFriendlyId: true },
    });

    // Create the organization in the database
    // return this.prisma.organizations.create({
    //   data: {
    //     name,
    //     website,
    //     orgFriendlyId,
    //   },
    // });
  }

  async leaveOrganization(userId: string, orgFriendlyId: string) {
    const organization = await this.prisma.organizations.findUnique({
      where: { orgFriendlyId },
      include: {
        orgUsers: {
          include: { role: true },
        },
      },
    });

    if (!organization?.id) {
      throw new HttpException(
        {
          data: null,
          message: `Organization with ${orgFriendlyId} does not exist.`,
          status: HttpStatus.NOT_FOUND,
          error: 'NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const user = organization.orgUsers.find((user) => user.userId === userId);

    if (!user) {
      throw new HttpException(
        {
          data: null,
          message: 'User does not belong to this organization.',
          status: HttpStatus.NOT_FOUND,
          error: 'NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isUserAdmin = user.role.name === Roles.ORG_ADMIN;

    const adminCount = organization.orgUsers.filter(
      (orgUser) => orgUser.role.name === Roles.ORG_ADMIN,
    ).length;

    if (isUserAdmin && adminCount === 1) {
      throw new HttpException(
        {
          data: null,
          message:
            'You cannot leave the organization as you are the last admin. Please transfer admin rights or delete the organization first.',
          status: HttpStatus.NOT_FOUND,
          error: 'NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.prisma.orgUsers.delete({
      where: {
        orgId_userId: {
          userId,
          orgId: organization.id,
        },
      },
    });

    return { message: `You have successfully left the organization.` };
  }

  private async generateUniqueOrgFriendlyId(orgName: string): Promise<string> {
    const slug = slugify(orgName, {
      lower: true,
      strict: true,
      replacement: '-',
    });
    let orgFriendlyId: string;
    let isUnique = false;

    do {
      const randomString = randomBytes(4).toString('hex'); // 8-character alphanumeric string
      orgFriendlyId = `${slug}-${randomString}`;

      // Check if this orgFriendlyId is already in use
      const existingOrg = await this.prisma.organizations.findUnique({
        where: { orgFriendlyId },
      });
      isUnique = !existingOrg;
    } while (!isUnique);

    return orgFriendlyId;
  }

  async deleteOrganization(
    userId: string,
    orgFriendlyId: string,
  ): Promise<{ message: string }> {
    const organization = await this.prisma.organizations.findUnique({
      where: { orgFriendlyId },
      include: {
        orgUsers: {
          include: { role: true },
        },
        teams: true,
      },
    });

    if (!organization) {
      throw new HttpException(
        {
          data: null,
          message: `Organization with ID ${orgFriendlyId} does not exist.`,
          status: HttpStatus.NOT_FOUND,
          error: 'NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const user = organization.orgUsers.find(
      (orgUser) => orgUser.userId === userId,
    );

    if (!user || user.role.name !== Roles.ORG_ADMIN) {
      throw new HttpException(
        {
          data: null,
          message: 'Only an organization admin can delete the organization.',
          status: HttpStatus.FORBIDDEN,
          error: 'FORBIDDEN',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.orgUsers.deleteMany({
          where: { orgId: organization.id },
        });

        await prisma.teamUsers.deleteMany({
          where: {
            team: {
              orgId: organization.id,
            },
          },
        });

        await prisma.teams.deleteMany({
          where: { orgId: organization.id },
        });

        await prisma.organizations.delete({
          where: { id: organization.id },
        });
      });

      return {
        message: `Organization ${organization.name} and all related data have been permanently deleted.`,
      };
    } catch (error) {
      throw new HttpException(
        {
          data: null,
          message: `An error occurred while deleting the organization: ${error.message}`,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'INTERNAL_SERVER_ERROR',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
