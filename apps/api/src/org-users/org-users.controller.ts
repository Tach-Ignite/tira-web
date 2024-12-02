import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { OrgUsersService } from './org-users.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetOrgUserDto } from './dto/get-org-user.dto';
import { Roles } from '../utils/roles.enums';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { OrgUserSearchPaginationDto } from './dto/search-org-user.dto';

@ApiTags('OrgUsers')
@Controller('org-users')
export class OrgUsersController {
  constructor(private readonly orgUsersService: OrgUsersService) {}

  @Get()
  @RoleAccess([Roles.SUPER_ADMIN, Roles.SYSTEM_ADMIN, Roles.ORG_ADMIN])
  @ApiOkResponse({
    description: 'List of org users',
    type: GetOrgUserDto,
  })
  async findAll(@Query() query: OrgUserSearchPaginationDto) {
    return this.orgUsersService.findAll(query);
  }

  @Get(':userId/org/:orgId')
  @RoleAccess([Roles.SUPER_ADMIN, Roles.SYSTEM_ADMIN, Roles.ORG_ADMIN])
  @ApiOkResponse({ description: 'Get org user by ID' })
  @ApiNotFoundResponse({ description: 'org user not found' })
  async findOne(
    @Param('userId') userId: string,
    @Param('orgId') orgId: string,
  ) {
    return this.orgUsersService.findOne(userId, orgId);
  }

  @Delete(':orgId/remove-user/:userId')
  @RoleAccess([Roles.SUPER_ADMIN, Roles.SYSTEM_ADMIN, Roles.ORG_ADMIN])
  @ApiOkResponse({
    description: 'Remove user from org',
  })
  async removeUser(
    @Param('orgId') orgId: string,
    @Param('userId') userId: string,
  ) {
    return this.orgUsersService.removeUser(userId, orgId);
  }
}
