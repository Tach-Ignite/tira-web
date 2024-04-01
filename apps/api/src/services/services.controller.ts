import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { Roles } from '@src/utils/roles.enums';
import { ApiAbstractResponse } from '@common/decorators';
import { ServiceEntity } from './entities/service.entity';
import { AbstractApiResponse } from '@src/utils/general-response';
import { ApiAbstractPaginationResponse } from '@common/decorators/abstractPaginationResponse.decorator';
import { SearchServiceDto } from './dto/search-service.dto';
import { SearchSlotsDto } from './dto/search-slots.dto';
import { Public } from '@common/decorators/public.decorators';

@ApiTags('Services')
@Controller('services')
@ApiCookieAuth()
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @RoleAccess([Roles.ADMIN])
  @ApiAbstractResponse({ model: ServiceEntity, statusCode: 'CREATED' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createServiceDto: CreateServiceDto) {
    const service = await this.servicesService.create(createServiceDto);
    return AbstractApiResponse.created(service, 'Service has been created!');
  }

  @Get()
  @Public()
  @ApiAbstractPaginationResponse(ServiceEntity)
  async findAll(@Query() query: SearchServiceDto) {
    const { data, meta } = await this.servicesService.findAll({ query });
    const services = data.map((val) => new ServiceEntity(val));
    return AbstractApiResponse.success({ services, meta });
  }

  @Get('slots')
  async getSlots(@Query() query: SearchSlotsDto) {
    const slots = await this.servicesService.getSlots(query);
    return AbstractApiResponse.success(slots);
  }

  @Get(':serviceId')
  @Public()
  @ApiAbstractResponse({ model: ServiceEntity })
  async findOne(@Param('serviceId') serviceId: string) {
    const service = await this.servicesService.findOne(serviceId);
    return AbstractApiResponse.success(service);
  }

  @Patch(':serviceId')
  @RoleAccess([Roles.ADMIN])
  @ApiAbstractResponse({ model: ServiceEntity })
  async update(
    @Param('serviceId') serviceId: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    const updatedService = await this.servicesService.update(
      serviceId,
      updateServiceDto,
    );
    return AbstractApiResponse.success(
      updatedService,
      'Service has been updated!',
    );
  }

  @Delete(':serviceId')
  @RoleAccess([Roles.ADMIN])
  @ApiAbstractResponse({ model: ServiceEntity })
  async remove(@Param('serviceId') serviceId: string) {
    const service = await this.servicesService.remove(serviceId);
    return AbstractApiResponse.success(service, 'Service has been deleted!');
  }
}
