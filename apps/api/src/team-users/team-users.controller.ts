import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { TeamUsersService } from './team-users.service';
import { ApiOkResponse, ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { Roles } from '../utils/roles.enums';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { UpdateTeamUserRoleDto } from './dto/update-team-user-role.dto';
import { TeamUserSearchPaginationDto } from './dto/search-team-user.dto';
import { GetTeamUserDto } from './dto/get-team-user.dto';
import { TeamUsersRolesEntity } from './entities/team-user-roles.entity';
// import { GetCurrentUserId } from '@common/decorators';
import { currentUserTeamAccess } from '@src/auth/current-user.decorator';
import { GetCurrentUserId } from '@common/decorators';

@ApiTags('TeamUsers')
@Controller('team-users')
export class TeamUsersController {
  constructor(private readonly teamUsersService: TeamUsersService) {}

  @Get()
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'List of team users',
    type: GetTeamUserDto,
  })
  async findAll(
    @Query() query: TeamUserSearchPaginationDto,
    @currentUserTeamAccess('teamId')
    teamUsersRoles: TeamUsersRolesEntity,
  ) {
    try {
      return await this.teamUsersService.findAll(query, teamUsersRoles);
    } catch (error) {
      throw error;
    }
  }

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

  @Delete(':teamId/leave')
  @ApiOkResponse({
    description: 'Leave Team',
  })
  async leaveTeam(
    @Param('teamId') teamId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.teamUsersService.removeUser(userId, teamId);
  }

  @Patch(':orgId/:teamId/assign-user-role/:userId')
  @ApiOkResponse({
    description: 'organization user role updated',
  })
  async roleUpdate(
    @Param('orgId') orgId: string,
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
    @Body() updateTeamUserRoleDto: UpdateTeamUserRoleDto,
    @currentUserTeamAccess('teamId')
    teamUsersRoles: TeamUsersRolesEntity,
  ) {
    return this.teamUsersService.roleUpdate(
      userId,
      orgId,
      teamId,
      teamUsersRoles,
      updateTeamUserRoleDto,
    );
  }
}
