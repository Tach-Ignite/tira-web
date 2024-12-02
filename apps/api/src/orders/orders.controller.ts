import { ApiAbstractResponse, GetCurrentUserId } from '@common/decorators';
import { ApiAbstractPaginationResponse } from '@common/decorators/abstractPaginationResponse.decorator';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { Controller, Get, Query, Param, Patch, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AbstractApiResponse } from '@src/utils/general-response';
import { Roles } from '@src/utils/roles.enums';
import { SearchOrderDto } from './dto/search-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiAbstractPaginationResponse(OrderEntity)
  async findAll(
    @Query() query: SearchOrderDto,
    @GetCurrentUserId() userId: string,
  ) {
    const { data, meta } = await this.ordersService.findAll({ query, userId });
    const orders = data.map((val) => new OrderEntity(val));
    return AbstractApiResponse.success({ data: orders, meta });
  }

  @Get(':orderId')
  @ApiAbstractResponse({ model: OrderEntity })
  async findOne(
    @Param('orderId') orderId: string,
    @GetCurrentUserId() userId: string,
  ) {
    const order = await this.ordersService.findOne({ orderId, userId });
    return AbstractApiResponse.success(order);
  }

  @Patch(':orderId')
  @RoleAccess([Roles.ORG_ADMIN])
  @ApiAbstractResponse({ model: OrderEntity })
  async updateOrder(
    @Param('orderId') orderId: string,
    @Body() data: UpdateOrderDto,
  ) {
    const order = await this.ordersService.update(orderId, data);
    return AbstractApiResponse.success(order, 'Order status has been updated!');
  }

  @Patch(':orderId/cancel')
  @ApiAbstractResponse({ model: OrderEntity })
  async cancelOrder(
    @Param('orderId') orderId: string,
    @GetCurrentUserId() userId: string,
  ) {
    const order = await this.ordersService.cancelOrder(orderId, userId);
    return AbstractApiResponse.success(order, 'Order has been cancelled!');
  }
}
