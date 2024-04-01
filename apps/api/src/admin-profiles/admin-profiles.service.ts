import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma_/prisma.service';
import { CreateUpdateAdminProfileArgs } from './admin-profiles.type';

@Injectable()
export class AdminProfilesService {
  constructor(private prisma: PrismaService) {}

  createOrUpdate(request: CreateUpdateAdminProfileArgs) {
    const { userId } = request;
    return this.prisma.adminProfile.upsert({
      where: {
        userId,
      },
      create: request,
      update: {
        ...request,
        lowInventoryEmailSchedule: request?.lowInventoryEmailSchedule || null,
        lowInventorySmsSchedule: request?.lowInventorySmsSchedule || null,
        orderCancelEmailSchedule: request?.orderCancelEmailSchedule || null,
        orderCancelSmsSchedule: request?.orderCancelSmsSchedule || null,
      },
    });
  }

  findOne(userId: string) {
    return this.prisma.adminProfile.findUniqueOrThrow({
      where: {
        userId,
      },
    });
  }
}
