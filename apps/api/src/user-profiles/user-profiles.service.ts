import { Injectable } from '@nestjs/common';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { PrismaService } from '@prisma_/prisma.service';
import { OrganizationsService } from '@src/organizations/organizations.service';

function excludeKeys(obj) {
  const keysToExclude = ['isOnboarding'];

  return Object.keys(obj).reduce((newObj, key) => {
    if (!keysToExclude.includes(key)) {
      newObj[key] = obj[key];
    }
    return newObj;
  }, {});
}

@Injectable()
export class UserProfilesService {
  constructor(
    private prisma: PrismaService,
    private organizationsService: OrganizationsService,
  ) {}
  async update(userId: string, data: Partial<UpdateUserProfileDto>) {
    const { isOnboarding = false } = data;
    if (isOnboarding) {
      const result = await this.prisma.userProfiles.findFirst({
        where: { userId },
        include: { user: true },
      });
      if (!result) {
        await this.prisma.userProfiles.upsert({
          where: { userId },
          create: { userId },
          update: {},
          include: {
            user: {
              include: {
                role: true,
              },
            },
          },
        });
      }
      const finalData = excludeKeys(data);
      return await this.prisma.onBoardingUserProfiles.upsert({
        where: { userId },
        create: { ...finalData, userId },
        update: { ...finalData },
        include: {
          user: {
            include: {
              role: true,
            },
          },
        },
      });
    }
    const result = await this.prisma.userProfiles.upsert({
      where: { userId },
      create: { ...data, userId },
      update: { ...data },
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
    });
    if (result && data?.companyName?.length) {
      const { companyName, websiteURL } = data;
      const organization = await this.organizationsService.createOrUpdate(
        companyName,
        websiteURL || '',
      );
      if (organization?.id) {
        const roleOrgAdmin = await this.prisma.userRoles.findUnique({
          where: {
            name: 'org-admin',
          },
        });
        if (roleOrgAdmin?.id) {
          await this.prisma.orgUsers.upsert({
            where: {
              orgId_userId: {
                orgId: organization.id,
                userId: userId,
              },
            },
            create: {
              orgId: organization.id,
              userId: userId,
              roleId: roleOrgAdmin.id,
              joinedAt: new Date(),
            },
            update: {
              orgId: organization.id,
              userId: userId,
              roleId: roleOrgAdmin.id,
            },
            select: { id: true, orgId: true, userId: true, roleId: true },
          });
        }
      }
    }
    return result;
  }

  async getUserProfile(userId: string) {
    const result = await this.prisma.userProfiles.findFirst({
      where: { userId },
      include: { user: true },
    });
    if (result && !result?.onboardingCompleted) {
      const onBoardingUserProfiles =
        await this.prisma.onBoardingUserProfiles.findFirst({
          where: { userId },
          include: { user: true },
        });
      if (onBoardingUserProfiles) {
        return onBoardingUserProfiles;
      }
    }
    return result;
  }
}
