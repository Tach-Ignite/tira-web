import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Teams } from '@prisma/client';
import { OrganizationEntity } from '../../organizations/entities/organization.entity';

export class TeamEntity implements Partial<Teams> {
  constructor(partial: Partial<TeamEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name?: string;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;

  @ApiProperty()
  orgId: string;

  @ApiPropertyOptional({ type: OrganizationEntity })
  organization?: OrganizationEntity;
}
