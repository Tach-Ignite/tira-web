/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { useState } from 'react';
import { Card } from '@src/flowbite';
import { LabelInput } from '@src/atoms';
import { ServiceBookingsModal } from '@src/modals';
import { ServiceDetailsGridProps } from './types';

function BookingDetailsGrid(props: ServiceDetailsGridProps) {
  const { serviceForm, isEditing } = props;

  const [showServiceBookingModal, setShowServiceBookingModal] = useState(false);

  const onShowModal = () => {
    setShowServiceBookingModal(true);
  };

  const onCloseModal = () => {
    setShowServiceBookingModal(!showServiceBookingModal);
  };

  const { control } = serviceForm;

  return showServiceBookingModal ? (
    <ServiceBookingsModal
      form={serviceForm}
      isEditing={isEditing}
      onCloseModal={onCloseModal}
      showModal={showServiceBookingModal}
    />
  ) : (
    <Card>
      <p className="text-black dark:text-white font-medium text-[18px] leading-[27px] mb-2">
        Booking details
      </p>
      <div className="flex max-[1500px]:gap-8 min-[1500px]:gap-36">
        <LabelInput
          name="duration"
          label="Duration of service"
          placeholder="Input text"
          control={control}
          isRequired
        />
        <LabelInput
          name="limitOfBookingsPerDay"
          label="Limit of bookings per day"
          placeholder="Input text"
          control={control}
          isRequired
        />
      </div>
      <div
        onClick={onShowModal}
        className="text-indigo-600 dark:text-yellow-400 font-medium text-sm cursor-pointer mb-3"
      >
        Set up service booking availability
      </div>
    </Card>
  );
}

export default BookingDetailsGrid;
