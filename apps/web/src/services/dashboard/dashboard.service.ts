'use server';

import { get } from '@services/fetch';
import { GetDashboardOverviewArgs } from './dashboard.type';

export const getAdminDashboardData = async (
  request: GetDashboardOverviewArgs,
) => {
  const { categoryFilterMonth, categoryFilterYear, earningsFilterYear } =
    request || {};

  const payload: any = {};

  if (categoryFilterMonth) {
    payload.categoryFilterMonth = categoryFilterMonth;
  }
  if (categoryFilterYear) {
    payload.categoryFilterYear = categoryFilterYear;
  }
  if (earningsFilterYear) {
    payload.earningsFilterYear = earningsFilterYear;
  }
  const payloadKeys = Object.keys(payload);
  const payloadValues = Object.values(payload);

  let query = `dashboard/admin-overview`;
  if (payloadKeys?.length === 1) {
    query += `?${payloadKeys?.[0]}=${payloadValues?.[0]}`;
  }
  if (payloadKeys?.length === 2) {
    query += `?${payloadKeys?.[0]}=${payloadValues?.[0]}&${payloadKeys?.[1]}=${payloadValues?.[1]}`;
  }
  if (payloadKeys?.length === 3) {
    query += `?${payloadKeys?.[0]}=${payloadValues?.[0]}&${payloadKeys?.[1]}=${payloadValues?.[1]}&${payloadKeys?.[2]}=${payloadValues?.[2]}`;
  }

  return get(query);
};
