import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Organizations } from '@prisma/client';

export class OrganizationEntity implements Partial<Organizations> {
  constructor(partial: Partial<OrganizationEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  orgFriendlyId: string;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}
