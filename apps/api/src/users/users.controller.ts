import { SkipThrottle } from '@nestjs/throttler';
import { Controller, Get, Param, Query, Patch, Body } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiTags,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
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
import { AdminConsoleUserDto } from './dto/admin-console-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateUserProfileRoleDto } from './dto/update-user-profile-role.dto';
import { UserRoleDto } from './dto/user-role.dto';
import { UpdateAnyUserDto } from './dto/update-any-user.dto';
import { AllUserDetailsEntity } from './entities/all-user-details.entity';

@ApiTags('Users')
@ApiCookieAuth()
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  @RoleAccess([Roles.SUPER_ADMIN])
  @ApiPaginatedResponse(UserEntity)
  async findAll(@Query() query: SearchPaginationDto) {
    const { data, meta } = await this.usersService.findAll(query);
    return { data: data.map((val) => new UserEntity(val)), meta };
  }

  @Get('all-users')
  @RoleAccess([Roles.SUPER_ADMIN])
  @ApiPaginatedResponse(UserEntity)
  async getUsers(@Query() query?: AdminConsoleUserDto) {
    const { orgId, teamId } = query;
    let users;
    if (teamId) {
      users = await this.usersService.getAllUsersInTeam(query);
    } else if (orgId) {
      users = await this.usersService.getAllUsersInOrg(query);
    } else {
      users = await this.usersService.findAll(query);
    }
    const { data, meta } = users;
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

  @Get('users/:userId/roles')
  @RoleAccess([Roles.SUPER_ADMIN])
  @ApiOkResponse({ type: UserEntity })
  async getUserRoles(
    @Param('userId') userId: string,
    @Query() query?: UserRoleDto,
  ) {
    return await this.usersService.getUserRoles(userId, query?.orgId);
  }

  @Get('current-user')
  @ApiOkResponse({ type: UserEntity })
  async findCurrentUser(@GetCurrentUserId() userId: string) {
    return await this.usersService.findOne(userId, false);
  }

  @ApiResponse({ type: UserEntity })
  @ApiBody({ type: UpdateUserProfileRoleDto })
  @Patch('users/profile-role')
  async updateProfileRoles(
    @GetCurrentUserId() userId: string,
    @Body() updateDto: UpdateUserProfileRoleDto,
  ) {
    return await this.usersService.update(userId, updateDto);
  }

  @Patch('update-user/:userId')
  @RoleAccess([Roles.SUPER_ADMIN])
  @ApiOkResponse({ type: AllUserDetailsEntity })
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateAnyUserDto,
  ) {
    return await this.usersService.updateAnyUser(userId, updateUserDto);
  }

  @Patch('users/update-role')
  @RoleAccess([Roles.SUPER_ADMIN])
  updateUserRole(
    @GetCurrentUserId() currentUserId: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.usersService.updateUserRole(updateRoleDto, currentUserId);
  }
}
