import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  Patch,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddCartItemDto } from './dto/create-item-cart.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UpdateCartItemDto } from './dto/update-item-cart.dto';
import { PrismaService } from '@prisma_/prisma.service';
import { CartEntity } from './entities/cart.entity';
import { GetCurrentUserId } from '../auth/current-user.decorator';

@ApiTags('Carts')
@Controller('carts')
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private prisma: PrismaService,
  ) {}

  @Get()
  @ApiOkResponse({ type: CartEntity })
  async getCart(@GetCurrentUserId() userId: string) {
    return new CartEntity(await this.cartsService.findCart(userId));
  }

  @Delete()
  @ApiOkResponse({ type: CartEntity })
  async emptyCart(@GetCurrentUserId() userId: string) {
    return await this.cartsService.clearCart(userId);
  }

  @Post('items')
  @ApiOkResponse({ type: CartEntity })
  async addItem(
    @Body() addItemDto: AddCartItemDto,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.cartsService.addItemToCart(addItemDto, userId);
  }

  @Patch('items')
  @ApiOkResponse({ type: CartEntity })
  async updateItem(
    @Body() updateItemDto: UpdateCartItemDto,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.cartsService.updateItemInCart(updateItemDto, userId);
  }

  @Delete('items/:productId')
  @ApiOkResponse({ type: CartEntity })
  async removeItem(
    @Param('productId') productId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return await this.cartsService.removeItemFromCart(productId, userId);
  }
}
