import { ApiAbstractResponse, GetCurrentUserId } from '@common/decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { CheckOutDto } from './dto/checkout.dto';
import { OrdersService } from './orders.service';
import { ApiTags } from '@nestjs/swagger';
import { AbstractApiResponse } from '@src/utils/general-response';
import { CheckoutResponseEntity } from './entities/checkout-response.entity';

@ApiTags('Checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiAbstractResponse({ model: CheckoutResponseEntity, statusCode: 'CREATED' })
  async create(
    @Body() createOrderDto: CheckOutDto,
    @GetCurrentUserId() userId: string,
  ) {
    const order = await this.ordersService.create(createOrderDto, userId);

    return AbstractApiResponse.success(
      { orderId: order?.orderId },
      'Checkout successful',
    );
  }
}
