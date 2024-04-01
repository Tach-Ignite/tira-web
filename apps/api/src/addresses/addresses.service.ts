import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address.entity';
import { AddressesFindAllArgs, AddressesFindOneArgs } from './addresses.type';
import { createPaginator } from 'prisma-pagination';
import { Prisma } from '@prisma/client';

@Injectable()
export class AddressesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAddressDto: CreateAddressDto, userId: string) {
    const createdAddress = await this.prisma.customerAddress.create({
      data: {
        ...createAddressDto,
        userId: userId,
      },
    });
    return createdAddress;
  }

  async findAll({
    query: { page, perPage, searchTerm = '' },
    userId,
  }: AddressesFindAllArgs) {
    const paginate = createPaginator({
      page,
      perPage,
    });
    return paginate<AddressEntity, Prisma.CustomerAddressFindManyArgs>(
      this.prisma.products,
      {
        orderBy: { createdAt: 'desc' },
        where: {
          userId: userId,
          OR: [
            {
              city: { contains: searchTerm, mode: 'insensitive' },
            },
            {
              state: { contains: searchTerm, mode: 'insensitive' },
            },
          ],
        },
      },
      {
        page,
        perPage,
      },
    );
  }

  async findOne({ addressId, userId }: AddressesFindOneArgs) {
    const address = await this.prisma.customerAddress.findUnique({
      where: { addressId: addressId, userId: userId },
    });
    return address;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto, userId: string) {
    const updatedAddress = await this.prisma.customerAddress.update({
      where: { addressId: id, userId: userId },
      data: updateAddressDto,
    });
    return updatedAddress;
  }

  async remove(id: string, userId: string) {
    const deletedAddress = await this.prisma.customerAddress.delete({
      where: { addressId: id, userId: userId },
    });
    return deletedAddress;
  }
}
