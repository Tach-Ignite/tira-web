import { Controller, Get, Param, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SearchPaginationDto } from '@common/dto/searchPagination.dto';
import { Roles } from '../utils/roles.enums';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { GetTeamDto } from './dto/get-team.dto';
import { TeamEntity } from './entities/team.entity';
import { GetCurrentUserId } from '@common/decorators';
import { TeamUsersRolesEntity } from '@src/team-users/entities/team-user-roles.entity';
import { currentUserTeamAccessByTeamFriendlyId } from '@src/auth/current-user.decorator';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @RoleAccess([Roles.SUPER_ADMIN, Roles.SYSTEM_ADMIN, Roles.ORG_ADMIN])
  @ApiOkResponse({
    description: 'List of teams',
    type: GetTeamDto,
  })
  async findAll(@Query() query: SearchPaginationDto) {
    return this.teamsService.findAll(query);
  }

  @Get(':teamFriendlyId')
  @ApiOkResponse({ type: TeamEntity })
  @ApiNotFoundResponse({ description: 'team not found' })
  async findOne(
    @GetCurrentUserId() userId: string,
    @Param('teamFriendlyId') teamFriendlyId: string,
    @currentUserTeamAccessByTeamFriendlyId('teamFriendlyId')
    teamUsersRoles: TeamUsersRolesEntity,
  ) {
    return this.teamsService.findOne(userId, teamFriendlyId, teamUsersRoles);
  }

  @Get('organization/:orgId')
  async findByOrganizationId(
    @Param('orgId') organizationId: string,
    @Query() query: SearchPaginationDto,
  ) {
    const { data, meta } = await this.teamsService.findByOrganizationId(
      organizationId,
      query,
    );
    return { data: data.map((val) => new TeamEntity(val)), meta };
  }
}
