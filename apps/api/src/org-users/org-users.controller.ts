import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Patch,
  Body,
} from '@nestjs/common';
import { OrgUsersService } from './org-users.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetOrgUserDto } from './dto/get-org-user.dto';
import { OrgUserSearchPaginationDto } from './dto/search-org-user.dto';
import { UpdateOrgUserRoleDto } from './dto/update-org-user-role';
import { isCurrentUserHasOrgDataAccess } from '@src/auth/current-user.decorator';

@ApiTags('OrgUsers')
@Controller('org-users')
export class OrgUsersController {
  constructor(private readonly orgUsersService: OrgUsersService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of org users',
    type: GetOrgUserDto,
  })
  async findAll(
    @Query() query: OrgUserSearchPaginationDto,
    @isCurrentUserHasOrgDataAccess('orgId') isOrgDataAccess: boolean,
  ) {
    return this.orgUsersService.findAll(query, isOrgDataAccess);
  }

  @Get(':orgId/user/:userId')
  @ApiOkResponse({ description: 'Get org user by ID' })
  @ApiNotFoundResponse({ description: 'org user not found' })
  async findOne(
    @Param('userId') userId: string,
    @Param('orgId') orgId: string,
    @isCurrentUserHasOrgDataAccess('orgId') isOrgDataAccess: boolean,
  ) {
    return this.orgUsersService.findOne(userId, orgId, isOrgDataAccess);
  }

  @Delete(':orgId/remove-user/:userId')
  @ApiOkResponse({
    description: 'Remove user from org',
  })
  async removeUser(
    @Param('orgId') orgId: string,
    @Param('userId') userId: string,
    @isCurrentUserHasOrgDataAccess('orgId') isOrgDataAccess: boolean,
  ) {
    return this.orgUsersService.removeUser(userId, orgId, isOrgDataAccess);
  }

  @Patch(':orgId/assign-user-role/:userId')
  @ApiOkResponse({
    description: 'organization user role updated',
  })
  async roleUpdate(
    @Param('orgId') orgId: string,
    @Param('userId') userId: string,
    @Body() updateOrgUserRoleDto: UpdateOrgUserRoleDto,
    @isCurrentUserHasOrgDataAccess('orgId') isOrgDataAccess: boolean,
  ) {
    return this.orgUsersService.roleUpdate(
      userId,
      orgId,
      isOrgDataAccess,
      updateOrgUserRoleDto,
    );
  }
}
