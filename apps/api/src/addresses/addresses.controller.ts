import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { GetCurrentUserId } from '@common/decorators';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AddressEntity } from './entities/address.entity';
import { ApiPaginatedResponse } from '@common/decorators/pagination.decorator';
import { SearchPaginationDto } from '@common/dto/searchPagination.dto';

@ApiTags('Addresses')
@Controller('addresses')
@ApiCookieAuth()
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.addressesService.create(createAddressDto, userId);
  }

  @Get()
  @ApiPaginatedResponse(AddressEntity)
  async findAll(
    @Query() query: SearchPaginationDto,
    @GetCurrentUserId() userId: string,
  ) {
    const { data, meta } = await this.addressesService.findAll({
      query,
      userId,
    });
    return { data: data.map((val) => new AddressEntity(val)), meta };
  }

  @Get(':addressId')
  findOne(
    @Param('addressId') addressId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.addressesService.findOne({ addressId, userId });
  }

  @Patch(':addressId')
  update(
    @Param('addressId') addressId: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.addressesService.update(addressId, updateAddressDto, userId);
  }

  @Delete(':addressId')
  remove(
    @Param('addressId') addressId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return this.addressesService.remove(addressId, userId);
  }
}
