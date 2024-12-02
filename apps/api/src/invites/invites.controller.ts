import { Controller, Get, Patch, Body, Param } from '@nestjs/common';
import { InvitesService } from './invites.service';
import {
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateInviteDto } from './dto/create-invite.dto';
import { Roles } from '../utils/roles.enums';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { Public } from '@common/decorators/public.decorators';
import { AbstractApiResponse } from '@src/utils/general-response';
import { GetCurrentUserId } from '@common/decorators';
import { InvitesEntity } from './entities/invite.entity';

@ApiTags('Invites')
@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @ApiCookieAuth()
  @ApiResponse({
    status: 200,
    description: 'The invite has been sent successfully.',
  })
  // @ApiOkResponse({ type: InvitesEntity })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Patch()
  @RoleAccess([Roles.SUPER_ADMIN, Roles.SYSTEM_ADMIN, Roles.ORG_ADMIN])
  async create(
    @Body() createInvite: CreateInviteDto,
    @GetCurrentUserId() userId: string,
  ) {
    const invite = await this.invitesService.update(userId, createInvite);
    return AbstractApiResponse.success(
      invite,
      'invitation has been successfully sent.',
    );
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({ type: InvitesEntity })
  @ApiNotFoundResponse({ description: 'invitation not found' })
  async findOne(@Param('id') id: string) {
    return this.invitesService.findOne(id);
  }

  @Public()
  @Get('verify/:id/:code')
  @ApiResponse({
    status: 200,
    description: 'Invitation accepted',
  })
  @ApiNotFoundResponse({ description: 'invitation not found' })
  async verify(@Param('id') id: string, @Param('code') code: string) {
    return this.invitesService.verify(id, code);
  }
}
