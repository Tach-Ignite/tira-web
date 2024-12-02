import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrgUsers } from '@prisma/client';
import { OrganizationEntity } from '@src/organizations/entities/organization.entity';
import { UserRole } from '../../user-role/entities/user-role.entity';
import { UserEntity } from '../../users/entities/user.entity';

export class OrgUsersEntity implements Partial<OrgUsers> {
  constructor(partial: Partial<OrgUsersEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  orgId?: string;

  @ApiProperty()
  userId?: string;

  @ApiProperty()
  roleId?: string;

  @ApiPropertyOptional()
  joinedAt?: Date;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;

  @ApiPropertyOptional({ type: OrganizationEntity })
  organizations?: OrganizationEntity;

  @ApiPropertyOptional({ type: UserRole })
  role?: UserRole;

  @ApiPropertyOptional({ type: UserEntity })
  users?: UserEntity;
}
