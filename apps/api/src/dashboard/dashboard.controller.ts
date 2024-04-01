import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { Roles } from '@src/utils/roles.enums';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetAdminDashboardOverviewDto } from './dto/get-admin-dashboard-overview.dto';
import { AdminDashboardOverviewEntity } from './entities/admin-dashboard.entity';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('admin-overview')
  @RoleAccess([Roles.ADMIN])
  @ApiOkResponse({ type: AdminDashboardOverviewEntity })
  async getAdminOverview(
    @Query() adminDashboardOverviewDto: GetAdminDashboardOverviewDto,
  ) {
    const { categoryFilterMonth, categoryFilterYear, earningsFilterYear } =
      adminDashboardOverviewDto;

    return new AdminDashboardOverviewEntity(
      await this.dashboardService.getAdminDashboardData(
        Number(earningsFilterYear),
        Number(categoryFilterYear),
        Number(categoryFilterMonth),
      ),
    );
  }
}
