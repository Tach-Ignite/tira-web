/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { EmailService } from '@src/email/email.service';
import { PrismaService } from '@prisma_/prisma.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { InviteType, InviteStatus } from '../utils/invites.enum';
import { Roles } from '../utils/roles.enums';
import { UserEntity } from '@src/users/entities/user.entity';
import { differenceInDays } from 'date-fns';

export interface TokenPayload {
  orgOrTeamId?: string;
  email: string;
}

@Injectable()
export class InvitesService {
  constructor(
    private prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async sendInviteEmail(
    user: UserEntity,
    inviteId: string,
    inviteType: InviteType,
    email: string,
    orgOrTeamData: any,
    inviteCode: string,
    roleName: string,
    isNewUser: boolean,
  ) {
    const redirectPath = !isNewUser
      ? `invites/${inviteId}?code=${inviteCode}`
      : `app/auth/signup?inviteId=${inviteId}&&code=${inviteCode}`;
    await this.emailService.sendEmail({
      from: this.configService.getOrThrow('EMAIL_SOURCE'),
      to: email,
      subject: `Invite to join ${inviteType === InviteType.ORGANIZATION ? 'Organization' : 'Team'}`,
      body: `Dear ${email},<br/>You have been invited to join ${inviteType === InviteType.ORGANIZATION ? 'Organization' : 'Team'} <strong>${orgOrTeamData?.name}</strong> as ${roleName} by ${user?.role?.name === Roles.SUPER_ADMIN || user?.role?.name === Roles.SYSTEM_ADMIN ? user?.email : `${user?.userProfile?.firstName || ''} ${user?.userProfile?.lastName || ''}`}.<br/><br/>Click the link below to accept the invite.<br/> <a href="${this.configService.getOrThrow('APP_URL')}/${redirectPath}" target="_blank">Accept Invite</a><br/><br/>Cheers,<br/>Tach Color Shop Team`,
    });
  }

  async findOne(id: string) {
    const invite = await this.prisma.invites.findUnique({
      where: { id },
      include: {
        organization: true,
        team: true,
        role: true,
      },
    });
    if (!invite) {
      throw new NotFoundException(`Invitation not found`);
    }
    return invite;
  }

  async update(userId: string, createInviteDto: CreateInviteDto) {
    const { email, orgId, teamId, isOrgTeamAdmin } = createInviteDto || {};
    if (!email || !orgId) {
      throw new BadRequestException(`Fields are missing`);
    }
    const userAdding = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (userAdding?.userId) {
      if (!teamId) {
        const orgUser = await this.prisma.orgUsers.findFirst({
          where: {
            orgId,
            userId: userAdding.userId,
          },
        });
        if (orgUser?.id) {
          throw new BadRequestException(
            `User already added in this organization`,
          );
        }
      } else {
        const teamUser = await this.prisma.teamUsers.findFirst({
          where: {
            teamId,
            userId: userAdding.userId,
          },
        });
        if (teamUser?.id) {
          throw new BadRequestException(`User already added in this team`);
        }
      }
    }

    const roles = await this.prisma.userRoles.findMany({});
    const inviteData = !teamId
      ? {
          email,
          orgId,
          inviteType: InviteType.ORGANIZATION,
          roleId: isOrgTeamAdmin
            ? roles.find((r) => r?.name === Roles.ORG_ADMIN)?.id
            : roles.find((r) => r?.name === Roles.ORG_MEMBER)?.id,
        }
      : {
          email,
          teamId,
          inviteType: InviteType.TEAM,
          roleId: isOrgTeamAdmin
            ? roles.find((r) => r?.name === Roles.TEAM_ADMIN)?.id
            : roles.find((r) => r?.name === Roles.TEAM_MEMBER)?.id,
        };
    if (!inviteData?.roleId) {
      throw new BadRequestException(`Role Not Found`);
    }
    const orgOrTeamData = !teamId
      ? await this.prisma.organizations.findUnique({
          where: { id: orgId },
          select: {
            name: true,
          },
        })
      : await this.prisma.teams.findUnique({
          where: { id: teamId },
          select: {
            name: true,
          },
        });
    if (!orgOrTeamData) {
      throw new BadRequestException(
        `${!teamId ? 'Organization' : 'Team'} Not Found`,
      );
    }

    const inviteCode = uuid();
    const invite = await this.prisma.invites.create({
      data: {
        ...inviteData,
        email,
        invitedUserId: userId,
        inviteCode,
        status: InviteStatus.PENDING,
      },
      include: {
        organization: true,
        team: true,
        role: true,
      },
    });
    const user = await this.prisma.users.findUnique({
      where: { userId },
      include: {
        userProfile: true,
        role: true,
      },
    });

    const roleName = teamId
      ? isOrgTeamAdmin
        ? 'Team Admin'
        : 'Team Member'
      : isOrgTeamAdmin
        ? 'Organization Admin'
        : 'Organization Member';
    await this.sendInviteEmail(
      user,
      invite?.id,
      !teamId ? InviteType.ORGANIZATION : InviteType.TEAM,
      email,
      orgOrTeamData,
      inviteCode,
      roleName,
      userAdding?.userId ? false : true,
    );
    return {
      success: true,
      data: invite,
    };
  }

  async verify(id: string, code: string) {
    const invite = await this.prisma.invites.findUnique({
      where: { id },
    });
    if (!invite) {
      throw new NotFoundException(`Invitation not found`);
    }
    const createdAt = invite.createdAt;
    const currentDate = new Date();

    // Calculate the difference in days
    const daysDifference = differenceInDays(currentDate, createdAt);
    // Check if the invite is older than 5 days
    if (daysDifference > 5) {
      await this.prisma.invites.update({
        where: { id },
        data: { status: InviteStatus.EXPIRED },
      });
      throw new BadRequestException(`Invitation Expired`);
    }
    if (invite?.status === InviteStatus.EXPIRED) {
      throw new BadRequestException(`Invitation Expired`);
    }
    if (invite?.inviteCode !== code) {
      throw new ForbiddenException('Access Denied');
    }
    const user = await this.prisma.users.findFirst({
      where: {
        email: invite.email,
      },
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    if (invite.inviteType === InviteType.ORGANIZATION && invite?.orgId) {
      const orgUser = await this.prisma.orgUsers.findFirst({
        where: {
          orgId: invite.orgId,
          userId: user.userId,
        },
      });
      if (orgUser?.id) {
        throw new BadRequestException(
          `User already added in this organization`,
        );
      } else {
        await this.prisma.orgUsers.create({
          data: {
            orgId: invite.orgId,
            userId: user.userId,
            roleId: invite.roleId,
            joinedAt: new Date(),
          },
        });
      }
    }
    if (invite.inviteType === InviteType.TEAM && invite?.teamId) {
      const teamData = await this.prisma.teams.findUnique({
        where: {
          id: invite.teamId,
        },
      });
      const orgMemberRole = await this.prisma.userRoles.findFirst({
        where: {
          name: Roles.ORG_MEMBER,
        },
      });
      const teamUser = await this.prisma.teamUsers.findFirst({
        where: {
          teamId: invite.teamId,
          userId: user.userId,
        },
      });
      if (teamUser?.id) {
        throw new BadRequestException(`User already added in this team`);
      } else {
        if (teamData?.id && teamData?.orgId && orgMemberRole?.id) {
          await this.prisma.orgUsers.create({
            data: {
              orgId: teamData?.orgId,
              userId: user.userId,
              roleId: orgMemberRole?.id,
              joinedAt: new Date(),
            },
          });
          await this.prisma.teamUsers.create({
            data: {
              teamId: invite.teamId,
              userId: user.userId,
              roleId: invite.roleId,
            },
          });
        } else {
          throw new BadRequestException(
            `Something went wrong. please try again later.`,
          );
        }
      }
    }
    const result = await this.prisma.invites.update({
      where: { id },
      data: { status: InviteStatus.EXPIRED },
      include: {
        organization: true,
        team: true,
        role: true,
      },
    });
    return result;
  }
}
