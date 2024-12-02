import { Controller, Get, Param, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SearchPaginationDto } from '@common/dto/searchPagination.dto';
import { Roles } from '../utils/roles.enums';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { GetTeamDto } from './dto/get-team.dto';
import { TeamEntity } from './entities/team.entity';

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

  @Get(':id')
  @RoleAccess([Roles.SUPER_ADMIN, Roles.SYSTEM_ADMIN, Roles.ORG_ADMIN])
  @ApiOkResponse({ type: TeamEntity })
  @ApiNotFoundResponse({ description: 'team not found' })
  async findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
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
