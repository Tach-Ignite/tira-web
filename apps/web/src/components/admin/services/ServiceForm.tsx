'use client';

import { BreadcrumbWithActions } from '@components/breadcrumbWithActions';
import { useCallback, useEffect, useState } from 'react';
import { ImageUpload } from '@src/atoms';
import { AddDescriptionGrid } from '@src/app/common/components';
import { useRouter } from 'next/navigation';
import { useCreateService, useUpdateService } from '@queries/useServicesQuery';
import { CategoryGrid } from '@components/product/create';
import { AdminRoutes } from '@src/routes';

import { ServiceFormProps, TimeSlot } from './types';
import {
  BookingDetailsGrid,
  PriceDetailsGrid,
  ServiceDetailsGrid,
} from './ServiceFormFields';
import { ServiceType } from '../../../types/modules';

function ServiceForm(props: ServiceFormProps) {
  const { isEditing, form, onDiscard } = props;

  const [showDescriptionField, setShowDescriptionField] = useState(false);
  const [showDetailsField, setShowDetailsField] = useState(false);
  const [showNotesField, setShowNotesField] = useState(false);

  const router = useRouter();

  const { mutateAsync: updateServiceAsync } = useUpdateService({
    successMessage: 'Service has been updated.',
    failureMessage: 'Failed to update Service.',
  });

  const { mutateAsync: addServiceAsync } = useCreateService({
    successMessage: 'Service has been created.',
    failureMessage: 'Failed to create Service.',
  });

  const {
    handleSubmit,
    watch,
    formState: { isDirty },
  } = form || {};

  const { description, serviceDetails, notes } = watch();

  const disabledSaveButton = isEditing ? !isDirty : isEditing;

  const convertTimeTo24HourFormat = (time: string): string => {
    const [timePart, modifier] = time.split(' ');
    const [hoursPart, minutes] = timePart.split(':').map(Number);
    let hours = hoursPart;

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const convertWeeklyHours = (weeklyHours: Record<string, TimeSlot>) => {
    const convertedWeeklyHours: any = {};
    Object.entries(weeklyHours).forEach(([day, times]) => {
      const { startTime, endTime } = times;
      convertedWeeklyHours[day] = {
        startTime: convertTimeTo24HourFormat(startTime),
        endTime: convertTimeTo24HourFormat(endTime),
      };
    });
    return convertedWeeklyHours;
  };

  const convertDateSpecificAvailability = (
    dateSpecificAvailability: Record<string, TimeSlot[]>,
  ) => {
    const convertedAvailability: any = {};

    Object.entries(dateSpecificAvailability).forEach(([date, timeSlots]) => {
      convertedAvailability[date] = timeSlots.map((timeSlot: any) => ({
        startTime: convertTimeTo24HourFormat(timeSlot.startTime),
        endTime: convertTimeTo24HourFormat(timeSlot.endTime),
      }));
    });
    return convertedAvailability;
  };

  useEffect(() => {
    description
      ? () => setShowDescriptionField(true)
      : () => setShowDescriptionField(false);
    serviceDetails
      ? () => setShowDetailsField(true)
      : () => setShowDetailsField(false);
    notes ? () => setShowNotesField(true) : () => setShowNotesField(false);
  }, [description, serviceDetails, notes]);

  const onSaveService = useCallback(
    async (data: ServiceType) => {
      const filteredData: ServiceType = {
        serviceId: data.serviceId,
        imageUrls: data.imageUrls,
        companyName: data.companyName,
        friendlyId: data.friendlyId,
        serviceName: data.serviceName,
        description: data.description,
        price: Number(data.price),
        msrp: Number(data.msrp),
        saleStartDate: new Date(data.saleStartDate).toISOString(),
        saleEndDate: new Date(data.saleEndDate).toISOString(),
        duration: Number(data.duration),
        limitOfBookingsPerDay: Number(data.limitOfBookingsPerDay),
        categoryIds: data.categoryIds,
        additionalDetails: data.additionalDetails,
        adminNotes: data.adminNotes,
        weeklyHours: convertWeeklyHours(data.weeklyHours ?? {}),
        dateSpecificAvailability: convertDateSpecificAvailability(
          data.dateSpecificAvailability ?? {},
        ),
      };

      try {
        if (isEditing) {
          await updateServiceAsync(filteredData);
        } else {
          delete filteredData.serviceId;
          await addServiceAsync(filteredData);
          router.push(AdminRoutes.Services);
        }
      } catch (e) {
        return e;
      }
      return '';
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isEditing, addServiceAsync, updateServiceAsync],
  );

  return (
    <div className="w-[100%]">
      <BreadcrumbWithActions
        isEditing={isEditing}
        pageName="Service"
        shouldDisabledSaveButton={disabledSaveButton}
        onDiscard={onDiscard}
        onSaveChange={handleSubmit(onSaveService)}
      />
      <div className="flex mt-5 gap-14 max-[1100px]:flex-col">
        <div className="w-[40%] flex flex-col gap-5 max-[1100px]:w-[100%]">
          <ImageUpload
            form={form}
            onUpdateImage={onSaveService}
            imageField="imageUrls"
          />
          <CategoryGrid productForm={form} isEditing={isEditing} />
        </div>
        <div className="w-[60%] flex flex-col gap-5 max-[1100px]:w-[100%]">
          <ServiceDetailsGrid serviceForm={form} isEditing={isEditing} />
          <PriceDetailsGrid serviceForm={form} isEditing={isEditing} />
          <BookingDetailsGrid serviceForm={form} isEditing={isEditing} />
          <AddDescriptionGrid
            form={form}
            addSectionName="Service Description"
            label="Service Description"
            name="description"
            showField={showDescriptionField}
            setShowField={setShowDescriptionField}
          />
          <AddDescriptionGrid
            form={form}
            addSectionName="Other Service Details"
            label="Service Details"
            name="additionalDetails"
            showField={showDetailsField}
            setShowField={setShowDetailsField}
          />
          <AddDescriptionGrid
            form={form}
            addSectionName="Admin Notes"
            label="Admin Notes"
            name="adminNotes"
            showField={showNotesField}
            setShowField={setShowNotesField}
          />
        </div>
      </div>
    </div>
  );
}

export default ServiceForm;
