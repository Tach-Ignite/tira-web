import { Controller, Delete, Get, Param } from '@nestjs/common';
import { TeamUsersService } from './team-users.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../utils/roles.enums';
import { RoleAccess } from '@common/decorators/admin.decorator';

@ApiTags('TeamUsers')
@Controller('team-users')
export class TeamUsersController {
  constructor(private readonly teamUsersService: TeamUsersService) {}

  @RoleAccess([
    Roles.SUPER_ADMIN,
    Roles.SYSTEM_ADMIN,
    Roles.ORG_ADMIN,
    Roles.TEAM_ADMIN,
  ])
  @Get(':userId/team/:teamId')
  async getTeamUserByTeamUserId(
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
  ) {
    return await this.teamUsersService.getTeamUserByTeamUserId(teamId, userId);
  }

  @Delete(':teamId/remove-user/:userId')
  @RoleAccess([
    Roles.SUPER_ADMIN,
    Roles.SYSTEM_ADMIN,
    Roles.ORG_ADMIN,
    Roles.TEAM_ADMIN,
  ])
  @ApiOkResponse({
    description: 'Remove user from Team',
  })
  async removeUser(
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
  ) {
    return this.teamUsersService.removeUser(userId, teamId);
  }
}
