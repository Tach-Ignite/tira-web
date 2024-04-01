import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma_/prisma.service';
import { AdminDashboardOverviewEntity } from './entities/admin-dashboard.entity';

const currentYear = new Date().getFullYear();

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getAdminDashboardData(
    monthlyEarningFilterYear?: number,
    categoryFilterYear?: number,
    categoryFilterMonth?: number,
  ): Promise<AdminDashboardOverviewEntity> {
    const targetYear = monthlyEarningFilterYear || currentYear;

    const currentDate = new Date();
    categoryFilterYear = categoryFilterYear || currentDate.getFullYear();
    categoryFilterMonth = categoryFilterMonth || currentDate.getMonth() + 1;

    const categoryStartDate = new Date(
      categoryFilterYear,
      categoryFilterMonth - 1,
      1,
    );

    const fromDate = new Date(targetYear, 0, 1);

    const toDate = new Date(targetYear, 11, 31, 23, 59, 59);

    const totalSalesAmount = await this.prisma.orders.aggregate({
      _sum: {
        total: true,
      },
    });

    const totalOrders = (await this.prisma.orders.count()) || 0;

    const allOrders = await this.prisma.orders.findMany({
      where: {
        createdAt: {
          gte: fromDate,
          lte: toDate,
        },
      },
    });

    const totalUsers = (await this.prisma.users.count()) || 0;

    const monthlyEarningsMap = allOrders.reduce((acc, order) => {
      const date = new Date(order.createdAt);
      const month = date.getMonth();
      const year = date.getFullYear();

      if (!acc[year]) {
        acc[year] = {};
      }

      acc[year][month] = (acc[year][month] || 0) + order.total;

      return acc;
    }, {});

    const monthlyEarningsArray = Array.from({ length: 12 }, (_, index) => {
      const monthDate = new Date(targetYear, index, 1);
      const monthName = monthDate.toLocaleString('default', { month: 'short' });
      const earnings = monthlyEarningsMap[targetYear]?.[index] || 0;

      return {
        year: targetYear,
        month: monthName,
        earnings,
      };
    });

    const totalShippedOrders =
      (await this.prisma.orders.count({
        where: {
          orderStatus: 'Shipped',
        },
      })) || 0;

    const totalOpenOrders =
      (await this.prisma.orders.count({
        where: {
          orderStatus: 'Pending',
        },
      })) || 0;

    const totalCanceledOrders =
      (await this.prisma.orders.count({
        where: {
          orderStatus: 'Cancelled',
        },
      })) || 0;

    const orderItems = await this.prisma.orderItems.findMany({
      where: {
        order: {
          createdAt: {
            gte: categoryStartDate,
            lt: new Date(categoryFilterYear, categoryFilterMonth, 1),
          },
        },
      },
      include: {
        product: {
          include: {
            categories: true,
          },
        },
      },
    });

    const categoryCounts = {};
    orderItems.forEach((orderItem) => {
      orderItem.product.categories.forEach((category) => {
        if (categoryCounts[category.name]) {
          categoryCounts[category.name] += orderItem.quantity;
        } else {
          categoryCounts[category.name] = orderItem.quantity;
        }
      });
    });

    const totalItems =
      Object.values(categoryCounts).reduce(
        (acc: number, count: number) => acc + count,
        0,
      ) || 0;

    const categoryPercentages = Object.keys(categoryCounts).map((category) => ({
      category,
      percentage: Number(
        ((categoryCounts[category] / Number(totalItems)) * 100).toFixed(2),
      ),
    }));

    return {
      totalSalesAmount: totalSalesAmount._sum.total || 0,
      totalOrders,
      monthlyEarnings: monthlyEarningsArray,
      totalShippedOrders,
      totalOpenOrders,
      totalCanceledOrders,
      totalUsers,
      categoryPercentages,
    };
  }
}
