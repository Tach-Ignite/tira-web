import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Invites } from '@prisma/client';
import { OrganizationEntity } from '../../organizations/entities/organization.entity';
import { TeamEntity } from '@src/teams/entities/team.entity';
import { UserRole } from '@src/user-role/entities/user-role.entity';
import { UserEntity } from '@src/users/entities/user.entity';
import { InviteStatus, InviteType } from '@src/utils/invites.enum';

export class InvitesEntity implements Partial<Invites> {
  constructor(partial: Partial<TeamEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  inviteCode: string;

  @ApiProperty()
  inviteType: InviteType;

  @ApiProperty()
  status: InviteStatus;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;

  @ApiProperty()
  orgId?: string;

  @ApiPropertyOptional({ type: OrganizationEntity })
  organization?: OrganizationEntity;

  @ApiProperty()
  teamId?: string;

  @ApiPropertyOptional({ type: TeamEntity })
  team?: TeamEntity;

  @ApiProperty()
  roleId: string;

  @ApiPropertyOptional({ type: UserRole })
  role?: UserRole;

  @ApiProperty()
  invitedUserId: string;

  @ApiPropertyOptional({ type: UserEntity })
  user?: UserEntity;
}
