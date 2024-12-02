import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TeamUsers } from '@prisma/client';
import { TeamEntity } from '../../teams/entities/team.entity';
import { UserRole } from '../../user-role/entities/user-role.entity';
import { UserEntity } from '../../users/entities/user.entity';

export class TeamUsersEntity implements Partial<TeamUsers> {
  constructor(partial: Partial<TeamUsersEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  teamId?: string;

  @ApiProperty()
  userId?: string;

  @ApiProperty()
  roleId?: string;

  @ApiPropertyOptional({ type: TeamEntity })
  team?: TeamEntity;

  @ApiPropertyOptional({ type: UserRole })
  role?: UserRole;

  @ApiPropertyOptional({ type: UserEntity })
  users?: UserEntity;
}
