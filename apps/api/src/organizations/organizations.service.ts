import { Injectable, NotFoundException } from '@nestjs/common';
import { createPaginator } from 'prisma-pagination';
import slugify from 'slugify';
import { randomBytes } from 'crypto';
import { PrismaService } from '@prisma_/prisma.service';
import { OrganizationEntity } from './entities/organization.entity';
import { Prisma } from '@prisma/client';
import { OrgSearchPagination } from './dto/orgSearchPagination.dto';

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
                  website: { contains: searchTerm, mode: 'insensitive' },
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

  async findOneByOrgFriendlyId(orgFriendlyId: string) {
    const organization = await this.prisma.organizations.findUnique({
      where: { orgFriendlyId },
    });
    if (!organization?.id) {
      throw new NotFoundException(
        `Organization with ${orgFriendlyId} does not exist.`,
      );
    }

    return organization;
  }

  async createOrUpdate(name: string, website: string) {
    const orgFriendlyId = await this.generateUniqueOrgFriendlyId(name);

    return await this.prisma.organizations.upsert({
      where: {
        name_website: {
          name,
          website: website || '',
        },
      },
      create: { name, website: website || '', orgFriendlyId },
      update: { name, website: website || '' },
      select: { name: true, id: true, website: true, orgFriendlyId: true },
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
}
