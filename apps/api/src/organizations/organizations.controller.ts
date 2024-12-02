import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { Roles } from '../utils/roles.enums';
import { GetOrganizationDto } from './dto/get-organization.dto';
import { OrgSearchPagination } from './dto/orgSearchPagination.dto';
import { OrganizationsService } from './organizations.service';
import { isSysAdmin } from '@src/auth/current-user.decorator';
import { GetCurrentUserId } from '@common/decorators';

@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of organizations',
    type: GetOrganizationDto,
  })
  async findAll(
    @Query() query: OrgSearchPagination,
    @GetCurrentUserId() userId: string,
    @isSysAdmin() isAdmin: boolean,
  ) {
    return this.organizationsService.findAll(query, userId, isAdmin);
  }

  @Get(':orgFriendlyId')
  @RoleAccess([Roles.SUPER_ADMIN, Roles.SYSTEM_ADMIN, Roles.ORG_ADMIN])
  @ApiOkResponse({ description: 'Get organization by ID' })
  @ApiNotFoundResponse({ description: 'Organization not found' })
  async findOneByOrgFriendlyId(@Param('orgFriendlyId') orgFriendlyId: string) {
    return this.organizationsService.findOneByOrgFriendlyId(orgFriendlyId);
  }
}
