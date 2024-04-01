import {
  Controller,
  Get,
  HttpStatus,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { AdminNotificationsService } from './admin-notifications.service';
import { AdminNotificationEntity } from './entities/admin-notification.entity';
import { AbstractApiResponse } from '@src/utils/general-response';
import { UpdateAdminNotificationDto } from './dto/update-admin-notification.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { Roles } from '@src/utils/roles.enums';
import { SearchPaginationDto } from '@common/dto/searchPagination.dto';
import { ApiAbstractPaginationResponse } from '@common/decorators/abstractPaginationResponse.decorator';
import { ApiAbstractResponse } from '@common/decorators';
import { AdminUnreadNotificationCount } from './entities/admin-unread-notification.entity';
import { AdminNotificationUpdateResponseEntity } from './entities/admin-notification-update.entity';

@ApiTags('Admin Notifications')
@RoleAccess([Roles.ADMIN])
@Controller('admin-notifications')
export class AdminNotificationsController {
  constructor(
    private readonly adminNotificationsService: AdminNotificationsService,
  ) {}

  @Get()
  @ApiAbstractPaginationResponse(AdminNotificationEntity)
  async findAll(@Query() query: SearchPaginationDto) {
    try {
      const { data, meta } =
        await this.adminNotificationsService.findAll(query);
      const result = data.map((val) => new AdminNotificationEntity(val));
      return AbstractApiResponse.success({ data: result, meta });
    } catch (error) {
      return AbstractApiResponse.failure(
        error,
        'Failed to fetch notifications',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('unread-count')
  @ApiAbstractResponse({ model: AdminUnreadNotificationCount })
  async getAllUnreadCount(): Promise<
    AbstractApiResponse<AdminUnreadNotificationCount>
  > {
    const result =
      await this.adminNotificationsService.getAllUnreadNotificationCount();
    return AbstractApiResponse.success({ unReadNotificationsCount: result });
  }

  @Patch()
  async update(
    @Body() updateAdminNotificationDto: UpdateAdminNotificationDto,
  ): Promise<AbstractApiResponse<AdminNotificationUpdateResponseEntity>> {
    return AbstractApiResponse.success(
      await this.adminNotificationsService.update(updateAdminNotificationDto),
      'Admin Notifications has been updated!',
    );
  }
}
