import { Controller, Body, Patch, Get } from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AbstractApiResponse } from '@src/utils/general-response';
import { ApiAbstractResponse, GetCurrentUserId } from '@common/decorators';
import { UserProfileEntity } from './entities/userProfile.entity';

@ApiTags('User Profiles')
@ApiCookieAuth()
@Controller('user-profiles')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) { }

  @ApiResponse({
    status: 200,
    description: 'The profile has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Patch()
  async update(
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @GetCurrentUserId() userId: string,
  ) {
    const profile = await this.userProfilesService.update(
      userId,
      updateUserProfileDto,
    );
    return AbstractApiResponse.success(
      profile,
      'The profile has been successfully updated.',
    );
  }

  @Get()
  @ApiAbstractResponse({ model: UserProfileEntity })
  async getUserProfile(@GetCurrentUserId() userId: string) {
    // console.log('getUserProfile userId', userId);
    const userProfile = await this.userProfilesService.getUserProfile(userId);
    return AbstractApiResponse.success(
      userProfile,
      'User Profile fetched successfully',
    );
  }
}
