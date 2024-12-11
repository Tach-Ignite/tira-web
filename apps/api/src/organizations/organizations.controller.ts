import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetOrganizationDto } from './dto/get-organization.dto';
import { OrgSearchPagination } from './dto/orgSearchPagination.dto';
import { OrganizationsService } from './organizations.service';
import {
  isCurrentUserHasOrgAccess,
  isCurrentUserOrgAdmin,
  isSysAdmin,
} from '@src/auth/current-user.decorator';
import { ApiAbstractResponse, GetCurrentUserId } from '@common/decorators';
import { OrganizationEntity } from './entities/organization.entity';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { AbstractApiResponse } from '@src/utils/general-response';

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
  @ApiOkResponse({ description: 'Get organization by ID' })
  @ApiNotFoundResponse({ description: 'Organization not found' })
  async findOneByOrgFriendlyId(
    @GetCurrentUserId() userId: string,
    @Param('orgFriendlyId') orgFriendlyId: string,
    @isCurrentUserHasOrgAccess('orgFriendlyId') orgPermission: boolean,
  ) {
    if (!orgPermission) return;
    return this.organizationsService.findOneByOrgFriendlyId(
      userId,
      orgFriendlyId,
    );
  }

  @Patch(':orgFriendlyId')
  @ApiAbstractResponse({ model: OrganizationEntity })
  async update(
    @Param('orgFriendlyId') orgFriendlyId: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
    @isCurrentUserOrgAdmin('orgFriendlyId') orgPermission: boolean,
  ): Promise<AbstractApiResponse<OrganizationEntity>> {
    if (!orgPermission) return;
    const updatedOrganization =
      await this.organizationsService.updateOrganization(
        orgFriendlyId,
        updateOrganizationDto,
      );
    return AbstractApiResponse.success(updatedOrganization);
  }

  @Delete('leave/:orgFriendlyId')
  async removeOrgUser(
    @GetCurrentUserId() userId: string,
    @Param('orgFriendlyId') orgFriendlyId: string,
    @isCurrentUserHasOrgAccess('orgFriendlyId') orgPermission: boolean,
  ) {
    if (!orgPermission) return;
    return await this.organizationsService.leaveOrganization(
      userId,
      orgFriendlyId,
    );
  }

  @Delete('delete/:orgFriendlyId')
  async deleteOrganization(
    @GetCurrentUserId() userId: string,
    @Param('orgFriendlyId') orgFriendlyId: string,
    @isCurrentUserOrgAdmin('orgFriendlyId') isOrgAdmin: boolean,
  ) {
    if (!isOrgAdmin) return;
    return await this.organizationsService.deleteOrganization(
      userId,
      orgFriendlyId,
    );
  }
}
