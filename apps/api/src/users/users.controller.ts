import { SkipThrottle } from '@nestjs/throttler';
import { Controller, Get, Param, Query, Patch, Body } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SearchPaginationDto } from '@common/dto/searchPagination.dto';
import { ApiPaginatedResponse } from '@common/decorators/pagination.decorator';
import { RoleAccess } from '@common/decorators/admin.decorator';

import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { AbstractApiResponse } from '../utils/general-response';
import { ApiAbstractResponse, GetCurrentUserId } from '@common/decorators';
import { TotalUsersCountEntity } from './entities/total-users-count.entity';
import { Roles } from '../utils/roles.enums';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfileEntity } from './entities/user-profile-entity';

@ApiTags('Users')
@ApiCookieAuth()
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  @RoleAccess([Roles.ADMIN])
  @ApiPaginatedResponse(UserEntity)
  async findAll(@Query() query: SearchPaginationDto) {
    const { data, meta } = await this.usersService.findAll(query);
    return { data: data.map((val) => new UserEntity(val)), meta };
  }

  @SkipThrottle()
  @Get('users/validateMe')
  @ApiOkResponse()
  async validateMe(): Promise<AbstractApiResponse<unknown>> {
    return AbstractApiResponse.success({});
  }

  @RoleAccess(['admin'])
  @Get('users/total-users-count')
  @ApiAbstractResponse({ model: TotalUsersCountEntity })
  async getTotalUsers() {
    const totalUsers = await this.usersService.getTotalUsers();
    return AbstractApiResponse.success<TotalUsersCountEntity>({
      totalUsersCount: totalUsers,
    });
  }

  @Get('users/:userId')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('userId') userId: string) {
    return await this.usersService.findOne(userId, false);
  }

  @Get('user/profile')
  @ApiOkResponse({ type: UserProfileEntity })
  async findUserProfile(@GetCurrentUserId() userId: string) {
    return await this.usersService.findOne(userId, true);
  }

  @Patch('user/profile')
  @ApiOkResponse({ type: UserProfileEntity })
  async updateUserProfile(
    @GetCurrentUserId() userId: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return await this.usersService.update(userId, updateUserProfileDto, true);
  }
}
