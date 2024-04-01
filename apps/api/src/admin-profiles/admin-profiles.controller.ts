import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdminProfilesService } from './admin-profiles.service';
import { ApiAbstractResponse, GetCurrentUserId } from '@common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { Roles } from '@src/utils/roles.enums';
import { AbstractApiResponse } from '@src/utils/general-response';
import { AdminProfileEntity } from './entities/admin-profile.entity';
import { CreateUpdateAdminProfileDto } from './dto/create-update-admin-profile.dto';

@ApiTags('Admin Profiles')
@RoleAccess([Roles.ADMIN])
@Controller('admin-profiles')
export class AdminProfilesController {
  constructor(private readonly adminProfilesService: AdminProfilesService) {}

  @Post()
  @ApiAbstractResponse({ model: AdminProfileEntity })
  async createOrUpdate(
    @Body() createUpdateAdminProfileDto: CreateUpdateAdminProfileDto,
    @GetCurrentUserId() userId: string,
  ): Promise<AbstractApiResponse<AdminProfileEntity>> {
    const profile = await this.adminProfilesService.createOrUpdate({
      userId,
      ...createUpdateAdminProfileDto,
    });
    return AbstractApiResponse.success(
      profile,
      'Admin profile has been updated!',
    );
  }

  @Get()
  @ApiAbstractResponse({ model: AdminProfileEntity })
  async findOne(
    @GetCurrentUserId() userId: string,
  ): Promise<AbstractApiResponse<AdminProfileEntity>> {
    const profile = await this.adminProfilesService.findOne(userId);
    return AbstractApiResponse.success(profile);
  }
}
