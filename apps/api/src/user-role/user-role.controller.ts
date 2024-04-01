import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { Roles } from '../utils/roles.enums';

@ApiTags('User Roles')
@Controller('user-roles')
@RoleAccess([Roles.ADMIN])
@ApiCookieAuth()
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(createUserRoleDto);
  }

  @Get()
  findAll() {
    return this.userRoleService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRoleService.remove(+id);
  }
}
