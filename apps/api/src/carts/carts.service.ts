import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma_/prisma.service';
import { AddCartItemDto } from './dto/create-item-cart.dto';
import { UpdateCartItemDto } from './dto/update-item-cart.dto';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async findCart(userId: string) {
    return await this.prisma.carts.upsert({
      where: { userId: userId },
      create: { userId: userId },
      update: {},
      include: {
        cartItems: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            product: {
              include: {
                favoriteUsers: {
                  where: { userId },
                },
              },
            },
          },
        },
      },
    });
  }

  async addItemToCart(addItemDto: AddCartItemDto, userId: string) {
    const cart = await this.findCart(userId);
    const product = await this.prisma.products.findUnique({
      where: { productId: addItemDto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const cartItem = await this.prisma.cartItems.findFirst({
      where: {
        cartId: cart.id,
        productId: product.productId,
      },
    });

    if (cartItem?.id) {
      await this.prisma.cartItems.upsert({
        where: { id: cartItem.id },
        create: {
          cart: {
            connect: { userId: userId },
          },
          product: {
            connect: { productId: addItemDto.productId },
          },
          quantity: addItemDto.quantity,
        },
        update: {
          quantity: { increment: addItemDto.quantity },
        },
      });
    } else {
      await this.prisma.cartItems.create({
        data: {
          cartId: cart.id,
          quantity: addItemDto.quantity,
          productId: addItemDto.productId,
        },
      });
    }

    return await this.prisma.carts.findUnique({
      where: { userId: userId },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async removeItemFromCart(productId: string, userId: string) {
    const cart = await this.findCart(userId);
    const cartItem = await this.prisma.cartItems.findFirst({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });
    const result = await this.prisma.$transaction([
      this.prisma.cartItems.delete({
        where: {
          id: cartItem.id,
        },
      }),

      this.prisma.carts.findUnique({
        where: { userId: userId },
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      }),
    ]);

    return result[1];
  }

  async updateItemInCart(updateItemDto: UpdateCartItemDto, userId: string) {
    const cart = await this.findCart(userId);

    const cartItem = await this.prisma.cartItems.findFirst({
      where: {
        cartId: cart.id,
        productId: updateItemDto.productId,
      },
      select: {
        id: true,
        quantity: true,
        product: {
          select: {
            salePrice: true,
          },
        },
      },
    });

    if (!cartItem) {
      throw new NotFoundException('cart item not found');
    }

    const result = await this.prisma.$transaction([
      updateItemDto.quantity > 0
        ? this.prisma.cartItems.update({
            where: { id: cartItem.id },
            data: {
              quantity: updateItemDto.quantity,
            },
          })
        : this.prisma.cartItems.delete({
            where: { id: cartItem.id },
          }),
      this.prisma.carts.findUnique({
        where: { userId: userId },
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      }),
    ]);
    return result[1];
  }

  async clearCart(userId: string) {
    const cart = await this.findCart(userId);

    const result = await this.prisma.$transaction([
      this.prisma.cartItems.deleteMany({
        where: { cartId: cart.id },
      }),
      this.prisma.carts.findUnique({
        where: { userId: userId },
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      }),
    ]);

    return result[1];
  }
}
