'use client';

import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { ServiceType } from '@src/types/modules';
import { useGetService } from '@queries/useServicesQuery';
import { ServiceForm } from '@components/admin/services';
import {
  convertTo12HourFormat,
  getDayName,
  getFullDates,
  weekdays,
} from '@src/lib/date';
import { FormattedHours } from '@components/admin/services/types';
import { useToast } from '../../../../../context/ToastContext';

function lowerize(word: string): string {
  return word.charAt(0).toLowerCase() + word.slice(1);
}

function EditServicePage() {
  const serviceForm = useForm<ServiceType>({ mode: 'onChange' });

  const { reset } = serviceForm || {};
  const { showSuccessToast } = useToast();

  const { serviceId } = useParams() || {};

  const { data: services, refetch } = useGetService(serviceId as string);

  const onSuccessCallback = async () => {
    await refetch();
    showSuccessToast({ message: 'Changes have been saved!' });
  };

  const resetFormValues = useCallback(() => {
    const categoryIds = services?.categories?.map(
      (category) => category?.categoryId,
    );

    const { saleEndDate, saleStartDate, weeklyHours } = services || {};

    const selectedDays = Object.keys(weeklyHours || {});

    const dateWithDays =
      saleStartDate &&
      saleEndDate &&
      getFullDates(new Date(saleStartDate), new Date(saleEndDate));
    const dates = dateWithDays && dateWithDays?.map(({ date }) => date);
    const filteredDates =
      dates && dates?.filter((date) => selectedDays.includes(getDayName(date)));

    const formattedHours: { [key: string]: FormattedHours } = {};

    weekdays.forEach((day) => {
      const dayData = weeklyHours?.[lowerize(day)];

      formattedHours[day] = {
        isAvailable: !!dayData,
        From: dayData?.startTime
          ? convertTo12HourFormat(dayData.startTime)
          : undefined,
        To: dayData?.endTime
          ? convertTo12HourFormat(dayData.endTime)
          : undefined,
      };
    });

    reset({
      ...services,
      saleEndDate: services?.saleEndDate
        ? new Date(services?.saleEndDate)
        : undefined,
      saleStartDate: services?.saleStartDate
        ? new Date(services?.saleStartDate)
        : undefined,
      serviceEndDate: services?.saleEndDate
        ? new Date(services?.saleEndDate)
        : undefined,
      serviceStartDate: services?.saleStartDate
        ? new Date(services?.saleStartDate)
        : undefined,
      selectedDates: filteredDates || [],
      categoryIds,
      ...formattedHours,
    });
  }, [services, reset]);

  useEffect(() => {
    if (services?.serviceId) {
      resetFormValues();
    }
  }, [services?.serviceId, resetFormValues]);

  return (
    <ServiceForm
      form={serviceForm}
      isEditing
      onSuccessCallback={onSuccessCallback}
      onDiscard={resetFormValues}
    />
  );
}

export default EditServicePage;
