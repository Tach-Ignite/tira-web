import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TeamEntity } from '../../teams/entities/team.entity';
import { UserRole } from '../../user-role/entities/user-role.entity';
import { UserEntity } from '../../users/entities/user.entity';

export class TeamUsersRolesEntity {
  @ApiProperty()
  id?: string;

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

  @ApiProperty()
  readAccess?: boolean;

  @ApiProperty()
  writeAccess?: boolean;
}
